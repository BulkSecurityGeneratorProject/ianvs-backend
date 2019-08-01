package com.toseanalytica.ianvs.web.rest;

import com.toseanalytica.ianvs.IanvsApp;

import com.toseanalytica.ianvs.domain.IncomeCategory;
import com.toseanalytica.ianvs.repository.IncomeCategoryRepository;
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
 * Test class for the IncomeCategoryResource REST controller.
 *
 * @see IncomeCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IanvsApp.class)
public class IncomeCategoryResourceIntTest {

    private static final String DEFAULT_CATEGORY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY_NAME = "BBBBBBBBBB";

    @Autowired
    private IncomeCategoryRepository incomeCategoryRepository;

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

    private MockMvc restIncomeCategoryMockMvc;

    private IncomeCategory incomeCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IncomeCategoryResource incomeCategoryResource = new IncomeCategoryResource(incomeCategoryRepository);
        this.restIncomeCategoryMockMvc = MockMvcBuilders.standaloneSetup(incomeCategoryResource)
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
    public static IncomeCategory createEntity(EntityManager em) {
        IncomeCategory incomeCategory = new IncomeCategory()
            .categoryName(DEFAULT_CATEGORY_NAME);
        return incomeCategory;
    }

    @Before
    public void initTest() {
        incomeCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createIncomeCategory() throws Exception {
        int databaseSizeBeforeCreate = incomeCategoryRepository.findAll().size();

        // Create the IncomeCategory
        restIncomeCategoryMockMvc.perform(post("/api/income-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incomeCategory)))
            .andExpect(status().isCreated());

        // Validate the IncomeCategory in the database
        List<IncomeCategory> incomeCategoryList = incomeCategoryRepository.findAll();
        assertThat(incomeCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        IncomeCategory testIncomeCategory = incomeCategoryList.get(incomeCategoryList.size() - 1);
        assertThat(testIncomeCategory.getCategoryName()).isEqualTo(DEFAULT_CATEGORY_NAME);
    }

    @Test
    @Transactional
    public void createIncomeCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = incomeCategoryRepository.findAll().size();

        // Create the IncomeCategory with an existing ID
        incomeCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIncomeCategoryMockMvc.perform(post("/api/income-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incomeCategory)))
            .andExpect(status().isBadRequest());

        // Validate the IncomeCategory in the database
        List<IncomeCategory> incomeCategoryList = incomeCategoryRepository.findAll();
        assertThat(incomeCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIncomeCategories() throws Exception {
        // Initialize the database
        incomeCategoryRepository.saveAndFlush(incomeCategory);

        // Get all the incomeCategoryList
        restIncomeCategoryMockMvc.perform(get("/api/income-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(incomeCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].categoryName").value(hasItem(DEFAULT_CATEGORY_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getIncomeCategory() throws Exception {
        // Initialize the database
        incomeCategoryRepository.saveAndFlush(incomeCategory);

        // Get the incomeCategory
        restIncomeCategoryMockMvc.perform(get("/api/income-categories/{id}", incomeCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(incomeCategory.getId().intValue()))
            .andExpect(jsonPath("$.categoryName").value(DEFAULT_CATEGORY_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIncomeCategory() throws Exception {
        // Get the incomeCategory
        restIncomeCategoryMockMvc.perform(get("/api/income-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIncomeCategory() throws Exception {
        // Initialize the database
        incomeCategoryRepository.saveAndFlush(incomeCategory);

        int databaseSizeBeforeUpdate = incomeCategoryRepository.findAll().size();

        // Update the incomeCategory
        IncomeCategory updatedIncomeCategory = incomeCategoryRepository.findById(incomeCategory.getId()).get();
        // Disconnect from session so that the updates on updatedIncomeCategory are not directly saved in db
        em.detach(updatedIncomeCategory);
        updatedIncomeCategory
            .categoryName(UPDATED_CATEGORY_NAME);

        restIncomeCategoryMockMvc.perform(put("/api/income-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIncomeCategory)))
            .andExpect(status().isOk());

        // Validate the IncomeCategory in the database
        List<IncomeCategory> incomeCategoryList = incomeCategoryRepository.findAll();
        assertThat(incomeCategoryList).hasSize(databaseSizeBeforeUpdate);
        IncomeCategory testIncomeCategory = incomeCategoryList.get(incomeCategoryList.size() - 1);
        assertThat(testIncomeCategory.getCategoryName()).isEqualTo(UPDATED_CATEGORY_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingIncomeCategory() throws Exception {
        int databaseSizeBeforeUpdate = incomeCategoryRepository.findAll().size();

        // Create the IncomeCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIncomeCategoryMockMvc.perform(put("/api/income-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incomeCategory)))
            .andExpect(status().isBadRequest());

        // Validate the IncomeCategory in the database
        List<IncomeCategory> incomeCategoryList = incomeCategoryRepository.findAll();
        assertThat(incomeCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIncomeCategory() throws Exception {
        // Initialize the database
        incomeCategoryRepository.saveAndFlush(incomeCategory);

        int databaseSizeBeforeDelete = incomeCategoryRepository.findAll().size();

        // Delete the incomeCategory
        restIncomeCategoryMockMvc.perform(delete("/api/income-categories/{id}", incomeCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IncomeCategory> incomeCategoryList = incomeCategoryRepository.findAll();
        assertThat(incomeCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IncomeCategory.class);
        IncomeCategory incomeCategory1 = new IncomeCategory();
        incomeCategory1.setId(1L);
        IncomeCategory incomeCategory2 = new IncomeCategory();
        incomeCategory2.setId(incomeCategory1.getId());
        assertThat(incomeCategory1).isEqualTo(incomeCategory2);
        incomeCategory2.setId(2L);
        assertThat(incomeCategory1).isNotEqualTo(incomeCategory2);
        incomeCategory1.setId(null);
        assertThat(incomeCategory1).isNotEqualTo(incomeCategory2);
    }
}
