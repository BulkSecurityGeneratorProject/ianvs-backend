package com.toseanalytica.ianvs.web.rest;

import com.toseanalytica.ianvs.IanvsApp;

import com.toseanalytica.ianvs.domain.CompanyStatus;
import com.toseanalytica.ianvs.repository.CompanyStatusRepository;
import com.toseanalytica.ianvs.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.toseanalytica.ianvs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CompanyStatusResource REST controller.
 *
 * @see CompanyStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IanvsApp.class)
public class CompanyStatusResourceIntTest {

    private static final String DEFAULT_COMPANY_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_STATUS = "BBBBBBBBBB";

    @Autowired
    private CompanyStatusRepository companyStatusRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCompanyStatusMockMvc;

    private CompanyStatus companyStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompanyStatusResource companyStatusResource = new CompanyStatusResource(companyStatusRepository);
        this.restCompanyStatusMockMvc = MockMvcBuilders.standaloneSetup(companyStatusResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CompanyStatus createEntity(EntityManager em) {
        CompanyStatus companyStatus = new CompanyStatus()
            .companyStatus(DEFAULT_COMPANY_STATUS);
        return companyStatus;
    }

    @Before
    public void initTest() {
        companyStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompanyStatus() throws Exception {
        int databaseSizeBeforeCreate = companyStatusRepository.findAll().size();

        // Create the CompanyStatus
        restCompanyStatusMockMvc.perform(post("/api/company-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyStatus)))
            .andExpect(status().isCreated());

        // Validate the CompanyStatus in the database
        List<CompanyStatus> companyStatusList = companyStatusRepository.findAll();
        assertThat(companyStatusList).hasSize(databaseSizeBeforeCreate + 1);
        CompanyStatus testCompanyStatus = companyStatusList.get(companyStatusList.size() - 1);
        assertThat(testCompanyStatus.getCompanyStatus()).isEqualTo(DEFAULT_COMPANY_STATUS);
    }

    @Test
    @Transactional
    public void createCompanyStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companyStatusRepository.findAll().size();

        // Create the CompanyStatus with an existing ID
        companyStatus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanyStatusMockMvc.perform(post("/api/company-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyStatus)))
            .andExpect(status().isBadRequest());

        // Validate the CompanyStatus in the database
        List<CompanyStatus> companyStatusList = companyStatusRepository.findAll();
        assertThat(companyStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCompanyStatuses() throws Exception {
        // Initialize the database
        companyStatusRepository.saveAndFlush(companyStatus);

        // Get all the companyStatusList
        restCompanyStatusMockMvc.perform(get("/api/company-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(companyStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyStatus").value(hasItem(DEFAULT_COMPANY_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getCompanyStatus() throws Exception {
        // Initialize the database
        companyStatusRepository.saveAndFlush(companyStatus);

        // Get the companyStatus
        restCompanyStatusMockMvc.perform(get("/api/company-statuses/{id}", companyStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(companyStatus.getId().intValue()))
            .andExpect(jsonPath("$.companyStatus").value(DEFAULT_COMPANY_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCompanyStatus() throws Exception {
        // Get the companyStatus
        restCompanyStatusMockMvc.perform(get("/api/company-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompanyStatus() throws Exception {
        // Initialize the database
        companyStatusRepository.saveAndFlush(companyStatus);

        int databaseSizeBeforeUpdate = companyStatusRepository.findAll().size();

        // Update the companyStatus
        CompanyStatus updatedCompanyStatus = companyStatusRepository.findById(companyStatus.getId()).get();
        // Disconnect from session so that the updates on updatedCompanyStatus are not directly saved in db
        em.detach(updatedCompanyStatus);
        updatedCompanyStatus
            .companyStatus(UPDATED_COMPANY_STATUS);

        restCompanyStatusMockMvc.perform(put("/api/company-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompanyStatus)))
            .andExpect(status().isOk());

        // Validate the CompanyStatus in the database
        List<CompanyStatus> companyStatusList = companyStatusRepository.findAll();
        assertThat(companyStatusList).hasSize(databaseSizeBeforeUpdate);
        CompanyStatus testCompanyStatus = companyStatusList.get(companyStatusList.size() - 1);
        assertThat(testCompanyStatus.getCompanyStatus()).isEqualTo(UPDATED_COMPANY_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingCompanyStatus() throws Exception {
        int databaseSizeBeforeUpdate = companyStatusRepository.findAll().size();

        // Create the CompanyStatus

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompanyStatusMockMvc.perform(put("/api/company-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyStatus)))
            .andExpect(status().isBadRequest());

        // Validate the CompanyStatus in the database
        List<CompanyStatus> companyStatusList = companyStatusRepository.findAll();
        assertThat(companyStatusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompanyStatus() throws Exception {
        // Initialize the database
        companyStatusRepository.saveAndFlush(companyStatus);

        int databaseSizeBeforeDelete = companyStatusRepository.findAll().size();

        // Delete the companyStatus
        restCompanyStatusMockMvc.perform(delete("/api/company-statuses/{id}", companyStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CompanyStatus> companyStatusList = companyStatusRepository.findAll();
        assertThat(companyStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompanyStatus.class);
        CompanyStatus companyStatus1 = new CompanyStatus();
        companyStatus1.setId(1L);
        CompanyStatus companyStatus2 = new CompanyStatus();
        companyStatus2.setId(companyStatus1.getId());
        assertThat(companyStatus1).isEqualTo(companyStatus2);
        companyStatus2.setId(2L);
        assertThat(companyStatus1).isNotEqualTo(companyStatus2);
        companyStatus1.setId(null);
        assertThat(companyStatus1).isNotEqualTo(companyStatus2);
    }
}
