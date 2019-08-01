package com.toseanalytica.ianvs.web.rest;

import com.toseanalytica.ianvs.IanvsApp;

import com.toseanalytica.ianvs.domain.ExpenseStatus;
import com.toseanalytica.ianvs.repository.ExpenseStatusRepository;
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
 * Test class for the ExpenseStatusResource REST controller.
 *
 * @see ExpenseStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IanvsApp.class)
public class ExpenseStatusResourceIntTest {

    private static final String DEFAULT_EXPENSE_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_EXPENSE_STATUS = "BBBBBBBBBB";

    @Autowired
    private ExpenseStatusRepository expenseStatusRepository;

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

    private MockMvc restExpenseStatusMockMvc;

    private ExpenseStatus expenseStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExpenseStatusResource expenseStatusResource = new ExpenseStatusResource(expenseStatusRepository);
        this.restExpenseStatusMockMvc = MockMvcBuilders.standaloneSetup(expenseStatusResource)
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
    public static ExpenseStatus createEntity(EntityManager em) {
        ExpenseStatus expenseStatus = new ExpenseStatus()
            .expenseStatus(DEFAULT_EXPENSE_STATUS);
        return expenseStatus;
    }

    @Before
    public void initTest() {
        expenseStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpenseStatus() throws Exception {
        int databaseSizeBeforeCreate = expenseStatusRepository.findAll().size();

        // Create the ExpenseStatus
        restExpenseStatusMockMvc.perform(post("/api/expense-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseStatus)))
            .andExpect(status().isCreated());

        // Validate the ExpenseStatus in the database
        List<ExpenseStatus> expenseStatusList = expenseStatusRepository.findAll();
        assertThat(expenseStatusList).hasSize(databaseSizeBeforeCreate + 1);
        ExpenseStatus testExpenseStatus = expenseStatusList.get(expenseStatusList.size() - 1);
        assertThat(testExpenseStatus.getExpenseStatus()).isEqualTo(DEFAULT_EXPENSE_STATUS);
    }

    @Test
    @Transactional
    public void createExpenseStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expenseStatusRepository.findAll().size();

        // Create the ExpenseStatus with an existing ID
        expenseStatus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpenseStatusMockMvc.perform(post("/api/expense-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseStatus)))
            .andExpect(status().isBadRequest());

        // Validate the ExpenseStatus in the database
        List<ExpenseStatus> expenseStatusList = expenseStatusRepository.findAll();
        assertThat(expenseStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllExpenseStatuses() throws Exception {
        // Initialize the database
        expenseStatusRepository.saveAndFlush(expenseStatus);

        // Get all the expenseStatusList
        restExpenseStatusMockMvc.perform(get("/api/expense-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expenseStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].expenseStatus").value(hasItem(DEFAULT_EXPENSE_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getExpenseStatus() throws Exception {
        // Initialize the database
        expenseStatusRepository.saveAndFlush(expenseStatus);

        // Get the expenseStatus
        restExpenseStatusMockMvc.perform(get("/api/expense-statuses/{id}", expenseStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expenseStatus.getId().intValue()))
            .andExpect(jsonPath("$.expenseStatus").value(DEFAULT_EXPENSE_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExpenseStatus() throws Exception {
        // Get the expenseStatus
        restExpenseStatusMockMvc.perform(get("/api/expense-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpenseStatus() throws Exception {
        // Initialize the database
        expenseStatusRepository.saveAndFlush(expenseStatus);

        int databaseSizeBeforeUpdate = expenseStatusRepository.findAll().size();

        // Update the expenseStatus
        ExpenseStatus updatedExpenseStatus = expenseStatusRepository.findById(expenseStatus.getId()).get();
        // Disconnect from session so that the updates on updatedExpenseStatus are not directly saved in db
        em.detach(updatedExpenseStatus);
        updatedExpenseStatus
            .expenseStatus(UPDATED_EXPENSE_STATUS);

        restExpenseStatusMockMvc.perform(put("/api/expense-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExpenseStatus)))
            .andExpect(status().isOk());

        // Validate the ExpenseStatus in the database
        List<ExpenseStatus> expenseStatusList = expenseStatusRepository.findAll();
        assertThat(expenseStatusList).hasSize(databaseSizeBeforeUpdate);
        ExpenseStatus testExpenseStatus = expenseStatusList.get(expenseStatusList.size() - 1);
        assertThat(testExpenseStatus.getExpenseStatus()).isEqualTo(UPDATED_EXPENSE_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingExpenseStatus() throws Exception {
        int databaseSizeBeforeUpdate = expenseStatusRepository.findAll().size();

        // Create the ExpenseStatus

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpenseStatusMockMvc.perform(put("/api/expense-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseStatus)))
            .andExpect(status().isBadRequest());

        // Validate the ExpenseStatus in the database
        List<ExpenseStatus> expenseStatusList = expenseStatusRepository.findAll();
        assertThat(expenseStatusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExpenseStatus() throws Exception {
        // Initialize the database
        expenseStatusRepository.saveAndFlush(expenseStatus);

        int databaseSizeBeforeDelete = expenseStatusRepository.findAll().size();

        // Delete the expenseStatus
        restExpenseStatusMockMvc.perform(delete("/api/expense-statuses/{id}", expenseStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ExpenseStatus> expenseStatusList = expenseStatusRepository.findAll();
        assertThat(expenseStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExpenseStatus.class);
        ExpenseStatus expenseStatus1 = new ExpenseStatus();
        expenseStatus1.setId(1L);
        ExpenseStatus expenseStatus2 = new ExpenseStatus();
        expenseStatus2.setId(expenseStatus1.getId());
        assertThat(expenseStatus1).isEqualTo(expenseStatus2);
        expenseStatus2.setId(2L);
        assertThat(expenseStatus1).isNotEqualTo(expenseStatus2);
        expenseStatus1.setId(null);
        assertThat(expenseStatus1).isNotEqualTo(expenseStatus2);
    }
}
