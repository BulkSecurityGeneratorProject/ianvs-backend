package com.toseanalytica.ianvs.web.rest;

import com.toseanalytica.ianvs.IanvsApp;

import com.toseanalytica.ianvs.domain.ExpenseCategory;
import com.toseanalytica.ianvs.repository.ExpenseCategoryRepository;
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
 * Test class for the ExpenseCategoryResource REST controller.
 *
 * @see ExpenseCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IanvsApp.class)
public class ExpenseCategoryResourceIntTest {

    private static final String DEFAULT_EXPENSE_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_EXPENSE_CATEGORY = "BBBBBBBBBB";

    @Autowired
    private ExpenseCategoryRepository expenseCategoryRepository;

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

    private MockMvc restExpenseCategoryMockMvc;

    private ExpenseCategory expenseCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExpenseCategoryResource expenseCategoryResource = new ExpenseCategoryResource(expenseCategoryRepository);
        this.restExpenseCategoryMockMvc = MockMvcBuilders.standaloneSetup(expenseCategoryResource)
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
    public static ExpenseCategory createEntity(EntityManager em) {
        ExpenseCategory expenseCategory = new ExpenseCategory()
            .expenseCategory(DEFAULT_EXPENSE_CATEGORY);
        return expenseCategory;
    }

    @Before
    public void initTest() {
        expenseCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpenseCategory() throws Exception {
        int databaseSizeBeforeCreate = expenseCategoryRepository.findAll().size();

        // Create the ExpenseCategory
        restExpenseCategoryMockMvc.perform(post("/api/expense-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseCategory)))
            .andExpect(status().isCreated());

        // Validate the ExpenseCategory in the database
        List<ExpenseCategory> expenseCategoryList = expenseCategoryRepository.findAll();
        assertThat(expenseCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        ExpenseCategory testExpenseCategory = expenseCategoryList.get(expenseCategoryList.size() - 1);
        assertThat(testExpenseCategory.getExpenseCategory()).isEqualTo(DEFAULT_EXPENSE_CATEGORY);
    }

    @Test
    @Transactional
    public void createExpenseCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expenseCategoryRepository.findAll().size();

        // Create the ExpenseCategory with an existing ID
        expenseCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpenseCategoryMockMvc.perform(post("/api/expense-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseCategory)))
            .andExpect(status().isBadRequest());

        // Validate the ExpenseCategory in the database
        List<ExpenseCategory> expenseCategoryList = expenseCategoryRepository.findAll();
        assertThat(expenseCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllExpenseCategories() throws Exception {
        // Initialize the database
        expenseCategoryRepository.saveAndFlush(expenseCategory);

        // Get all the expenseCategoryList
        restExpenseCategoryMockMvc.perform(get("/api/expense-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expenseCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].expenseCategory").value(hasItem(DEFAULT_EXPENSE_CATEGORY.toString())));
    }
    
    @Test
    @Transactional
    public void getExpenseCategory() throws Exception {
        // Initialize the database
        expenseCategoryRepository.saveAndFlush(expenseCategory);

        // Get the expenseCategory
        restExpenseCategoryMockMvc.perform(get("/api/expense-categories/{id}", expenseCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expenseCategory.getId().intValue()))
            .andExpect(jsonPath("$.expenseCategory").value(DEFAULT_EXPENSE_CATEGORY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExpenseCategory() throws Exception {
        // Get the expenseCategory
        restExpenseCategoryMockMvc.perform(get("/api/expense-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpenseCategory() throws Exception {
        // Initialize the database
        expenseCategoryRepository.saveAndFlush(expenseCategory);

        int databaseSizeBeforeUpdate = expenseCategoryRepository.findAll().size();

        // Update the expenseCategory
        ExpenseCategory updatedExpenseCategory = expenseCategoryRepository.findById(expenseCategory.getId()).get();
        // Disconnect from session so that the updates on updatedExpenseCategory are not directly saved in db
        em.detach(updatedExpenseCategory);
        updatedExpenseCategory
            .expenseCategory(UPDATED_EXPENSE_CATEGORY);

        restExpenseCategoryMockMvc.perform(put("/api/expense-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExpenseCategory)))
            .andExpect(status().isOk());

        // Validate the ExpenseCategory in the database
        List<ExpenseCategory> expenseCategoryList = expenseCategoryRepository.findAll();
        assertThat(expenseCategoryList).hasSize(databaseSizeBeforeUpdate);
        ExpenseCategory testExpenseCategory = expenseCategoryList.get(expenseCategoryList.size() - 1);
        assertThat(testExpenseCategory.getExpenseCategory()).isEqualTo(UPDATED_EXPENSE_CATEGORY);
    }

    @Test
    @Transactional
    public void updateNonExistingExpenseCategory() throws Exception {
        int databaseSizeBeforeUpdate = expenseCategoryRepository.findAll().size();

        // Create the ExpenseCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpenseCategoryMockMvc.perform(put("/api/expense-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseCategory)))
            .andExpect(status().isBadRequest());

        // Validate the ExpenseCategory in the database
        List<ExpenseCategory> expenseCategoryList = expenseCategoryRepository.findAll();
        assertThat(expenseCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExpenseCategory() throws Exception {
        // Initialize the database
        expenseCategoryRepository.saveAndFlush(expenseCategory);

        int databaseSizeBeforeDelete = expenseCategoryRepository.findAll().size();

        // Delete the expenseCategory
        restExpenseCategoryMockMvc.perform(delete("/api/expense-categories/{id}", expenseCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ExpenseCategory> expenseCategoryList = expenseCategoryRepository.findAll();
        assertThat(expenseCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExpenseCategory.class);
        ExpenseCategory expenseCategory1 = new ExpenseCategory();
        expenseCategory1.setId(1L);
        ExpenseCategory expenseCategory2 = new ExpenseCategory();
        expenseCategory2.setId(expenseCategory1.getId());
        assertThat(expenseCategory1).isEqualTo(expenseCategory2);
        expenseCategory2.setId(2L);
        assertThat(expenseCategory1).isNotEqualTo(expenseCategory2);
        expenseCategory1.setId(null);
        assertThat(expenseCategory1).isNotEqualTo(expenseCategory2);
    }
}
