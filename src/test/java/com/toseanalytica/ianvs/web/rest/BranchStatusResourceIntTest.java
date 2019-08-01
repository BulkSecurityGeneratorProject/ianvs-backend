package com.toseanalytica.ianvs.web.rest;

import com.toseanalytica.ianvs.IanvsApp;

import com.toseanalytica.ianvs.domain.BranchStatus;
import com.toseanalytica.ianvs.repository.BranchStatusRepository;
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
 * Test class for the BranchStatusResource REST controller.
 *
 * @see BranchStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IanvsApp.class)
public class BranchStatusResourceIntTest {

    private static final String DEFAULT_BRANCH_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_BRANCH_STATUS = "BBBBBBBBBB";

    @Autowired
    private BranchStatusRepository branchStatusRepository;

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

    private MockMvc restBranchStatusMockMvc;

    private BranchStatus branchStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BranchStatusResource branchStatusResource = new BranchStatusResource(branchStatusRepository);
        this.restBranchStatusMockMvc = MockMvcBuilders.standaloneSetup(branchStatusResource)
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
    public static BranchStatus createEntity(EntityManager em) {
        BranchStatus branchStatus = new BranchStatus()
            .branchStatus(DEFAULT_BRANCH_STATUS);
        return branchStatus;
    }

    @Before
    public void initTest() {
        branchStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createBranchStatus() throws Exception {
        int databaseSizeBeforeCreate = branchStatusRepository.findAll().size();

        // Create the BranchStatus
        restBranchStatusMockMvc.perform(post("/api/branch-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(branchStatus)))
            .andExpect(status().isCreated());

        // Validate the BranchStatus in the database
        List<BranchStatus> branchStatusList = branchStatusRepository.findAll();
        assertThat(branchStatusList).hasSize(databaseSizeBeforeCreate + 1);
        BranchStatus testBranchStatus = branchStatusList.get(branchStatusList.size() - 1);
        assertThat(testBranchStatus.getBranchStatus()).isEqualTo(DEFAULT_BRANCH_STATUS);
    }

    @Test
    @Transactional
    public void createBranchStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = branchStatusRepository.findAll().size();

        // Create the BranchStatus with an existing ID
        branchStatus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBranchStatusMockMvc.perform(post("/api/branch-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(branchStatus)))
            .andExpect(status().isBadRequest());

        // Validate the BranchStatus in the database
        List<BranchStatus> branchStatusList = branchStatusRepository.findAll();
        assertThat(branchStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBranchStatuses() throws Exception {
        // Initialize the database
        branchStatusRepository.saveAndFlush(branchStatus);

        // Get all the branchStatusList
        restBranchStatusMockMvc.perform(get("/api/branch-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(branchStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].branchStatus").value(hasItem(DEFAULT_BRANCH_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getBranchStatus() throws Exception {
        // Initialize the database
        branchStatusRepository.saveAndFlush(branchStatus);

        // Get the branchStatus
        restBranchStatusMockMvc.perform(get("/api/branch-statuses/{id}", branchStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(branchStatus.getId().intValue()))
            .andExpect(jsonPath("$.branchStatus").value(DEFAULT_BRANCH_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBranchStatus() throws Exception {
        // Get the branchStatus
        restBranchStatusMockMvc.perform(get("/api/branch-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBranchStatus() throws Exception {
        // Initialize the database
        branchStatusRepository.saveAndFlush(branchStatus);

        int databaseSizeBeforeUpdate = branchStatusRepository.findAll().size();

        // Update the branchStatus
        BranchStatus updatedBranchStatus = branchStatusRepository.findById(branchStatus.getId()).get();
        // Disconnect from session so that the updates on updatedBranchStatus are not directly saved in db
        em.detach(updatedBranchStatus);
        updatedBranchStatus
            .branchStatus(UPDATED_BRANCH_STATUS);

        restBranchStatusMockMvc.perform(put("/api/branch-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBranchStatus)))
            .andExpect(status().isOk());

        // Validate the BranchStatus in the database
        List<BranchStatus> branchStatusList = branchStatusRepository.findAll();
        assertThat(branchStatusList).hasSize(databaseSizeBeforeUpdate);
        BranchStatus testBranchStatus = branchStatusList.get(branchStatusList.size() - 1);
        assertThat(testBranchStatus.getBranchStatus()).isEqualTo(UPDATED_BRANCH_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingBranchStatus() throws Exception {
        int databaseSizeBeforeUpdate = branchStatusRepository.findAll().size();

        // Create the BranchStatus

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBranchStatusMockMvc.perform(put("/api/branch-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(branchStatus)))
            .andExpect(status().isBadRequest());

        // Validate the BranchStatus in the database
        List<BranchStatus> branchStatusList = branchStatusRepository.findAll();
        assertThat(branchStatusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBranchStatus() throws Exception {
        // Initialize the database
        branchStatusRepository.saveAndFlush(branchStatus);

        int databaseSizeBeforeDelete = branchStatusRepository.findAll().size();

        // Delete the branchStatus
        restBranchStatusMockMvc.perform(delete("/api/branch-statuses/{id}", branchStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BranchStatus> branchStatusList = branchStatusRepository.findAll();
        assertThat(branchStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BranchStatus.class);
        BranchStatus branchStatus1 = new BranchStatus();
        branchStatus1.setId(1L);
        BranchStatus branchStatus2 = new BranchStatus();
        branchStatus2.setId(branchStatus1.getId());
        assertThat(branchStatus1).isEqualTo(branchStatus2);
        branchStatus2.setId(2L);
        assertThat(branchStatus1).isNotEqualTo(branchStatus2);
        branchStatus1.setId(null);
        assertThat(branchStatus1).isNotEqualTo(branchStatus2);
    }
}
