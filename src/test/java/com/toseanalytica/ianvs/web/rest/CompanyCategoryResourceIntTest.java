package com.toseanalytica.ianvs.web.rest;

import com.toseanalytica.ianvs.IanvsApp;

import com.toseanalytica.ianvs.domain.CompanyCategory;
import com.toseanalytica.ianvs.repository.CompanyCategoryRepository;
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
 * Test class for the CompanyCategoryResource REST controller.
 *
 * @see CompanyCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IanvsApp.class)
public class CompanyCategoryResourceIntTest {

    private static final String DEFAULT_COMPANY_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_CATEGORY = "BBBBBBBBBB";

    @Autowired
    private CompanyCategoryRepository companyCategoryRepository;

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

    private MockMvc restCompanyCategoryMockMvc;

    private CompanyCategory companyCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompanyCategoryResource companyCategoryResource = new CompanyCategoryResource(companyCategoryRepository);
        this.restCompanyCategoryMockMvc = MockMvcBuilders.standaloneSetup(companyCategoryResource)
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
    public static CompanyCategory createEntity(EntityManager em) {
        CompanyCategory companyCategory = new CompanyCategory()
            .companyCategory(DEFAULT_COMPANY_CATEGORY);
        return companyCategory;
    }

    @Before
    public void initTest() {
        companyCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompanyCategory() throws Exception {
        int databaseSizeBeforeCreate = companyCategoryRepository.findAll().size();

        // Create the CompanyCategory
        restCompanyCategoryMockMvc.perform(post("/api/company-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyCategory)))
            .andExpect(status().isCreated());

        // Validate the CompanyCategory in the database
        List<CompanyCategory> companyCategoryList = companyCategoryRepository.findAll();
        assertThat(companyCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        CompanyCategory testCompanyCategory = companyCategoryList.get(companyCategoryList.size() - 1);
        assertThat(testCompanyCategory.getCompanyCategory()).isEqualTo(DEFAULT_COMPANY_CATEGORY);
    }

    @Test
    @Transactional
    public void createCompanyCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companyCategoryRepository.findAll().size();

        // Create the CompanyCategory with an existing ID
        companyCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanyCategoryMockMvc.perform(post("/api/company-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyCategory)))
            .andExpect(status().isBadRequest());

        // Validate the CompanyCategory in the database
        List<CompanyCategory> companyCategoryList = companyCategoryRepository.findAll();
        assertThat(companyCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCompanyCategories() throws Exception {
        // Initialize the database
        companyCategoryRepository.saveAndFlush(companyCategory);

        // Get all the companyCategoryList
        restCompanyCategoryMockMvc.perform(get("/api/company-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(companyCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyCategory").value(hasItem(DEFAULT_COMPANY_CATEGORY.toString())));
    }
    
    @Test
    @Transactional
    public void getCompanyCategory() throws Exception {
        // Initialize the database
        companyCategoryRepository.saveAndFlush(companyCategory);

        // Get the companyCategory
        restCompanyCategoryMockMvc.perform(get("/api/company-categories/{id}", companyCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(companyCategory.getId().intValue()))
            .andExpect(jsonPath("$.companyCategory").value(DEFAULT_COMPANY_CATEGORY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCompanyCategory() throws Exception {
        // Get the companyCategory
        restCompanyCategoryMockMvc.perform(get("/api/company-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompanyCategory() throws Exception {
        // Initialize the database
        companyCategoryRepository.saveAndFlush(companyCategory);

        int databaseSizeBeforeUpdate = companyCategoryRepository.findAll().size();

        // Update the companyCategory
        CompanyCategory updatedCompanyCategory = companyCategoryRepository.findById(companyCategory.getId()).get();
        // Disconnect from session so that the updates on updatedCompanyCategory are not directly saved in db
        em.detach(updatedCompanyCategory);
        updatedCompanyCategory
            .companyCategory(UPDATED_COMPANY_CATEGORY);

        restCompanyCategoryMockMvc.perform(put("/api/company-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompanyCategory)))
            .andExpect(status().isOk());

        // Validate the CompanyCategory in the database
        List<CompanyCategory> companyCategoryList = companyCategoryRepository.findAll();
        assertThat(companyCategoryList).hasSize(databaseSizeBeforeUpdate);
        CompanyCategory testCompanyCategory = companyCategoryList.get(companyCategoryList.size() - 1);
        assertThat(testCompanyCategory.getCompanyCategory()).isEqualTo(UPDATED_COMPANY_CATEGORY);
    }

    @Test
    @Transactional
    public void updateNonExistingCompanyCategory() throws Exception {
        int databaseSizeBeforeUpdate = companyCategoryRepository.findAll().size();

        // Create the CompanyCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompanyCategoryMockMvc.perform(put("/api/company-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyCategory)))
            .andExpect(status().isBadRequest());

        // Validate the CompanyCategory in the database
        List<CompanyCategory> companyCategoryList = companyCategoryRepository.findAll();
        assertThat(companyCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompanyCategory() throws Exception {
        // Initialize the database
        companyCategoryRepository.saveAndFlush(companyCategory);

        int databaseSizeBeforeDelete = companyCategoryRepository.findAll().size();

        // Delete the companyCategory
        restCompanyCategoryMockMvc.perform(delete("/api/company-categories/{id}", companyCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CompanyCategory> companyCategoryList = companyCategoryRepository.findAll();
        assertThat(companyCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompanyCategory.class);
        CompanyCategory companyCategory1 = new CompanyCategory();
        companyCategory1.setId(1L);
        CompanyCategory companyCategory2 = new CompanyCategory();
        companyCategory2.setId(companyCategory1.getId());
        assertThat(companyCategory1).isEqualTo(companyCategory2);
        companyCategory2.setId(2L);
        assertThat(companyCategory1).isNotEqualTo(companyCategory2);
        companyCategory1.setId(null);
        assertThat(companyCategory1).isNotEqualTo(companyCategory2);
    }
}
