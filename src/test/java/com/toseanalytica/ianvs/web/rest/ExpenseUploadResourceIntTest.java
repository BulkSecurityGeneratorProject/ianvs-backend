package com.toseanalytica.ianvs.web.rest;

import com.toseanalytica.ianvs.IanvsApp;

import com.toseanalytica.ianvs.domain.ExpenseUpload;
import com.toseanalytica.ianvs.repository.ExpenseUploadRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.toseanalytica.ianvs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ExpenseUploadResource REST controller.
 *
 * @see ExpenseUploadResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IanvsApp.class)
public class ExpenseUploadResourceIntTest {

    private static final String DEFAULT_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_STATUS_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_STATUS_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_DATE_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_ACCOUNTING_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ACCOUNTING_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ExpenseUploadRepository expenseUploadRepository;

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

    private MockMvc restExpenseUploadMockMvc;

    private ExpenseUpload expenseUpload;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExpenseUploadResource expenseUploadResource = new ExpenseUploadResource(expenseUploadRepository);
        this.restExpenseUploadMockMvc = MockMvcBuilders.standaloneSetup(expenseUploadResource)
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
    public static ExpenseUpload createEntity(EntityManager em) {
        ExpenseUpload expenseUpload = new ExpenseUpload()
            .fileName(DEFAULT_FILE_NAME)
            .statusDate(DEFAULT_STATUS_DATE)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .dateCreated(DEFAULT_DATE_CREATED)
            .accountingDate(DEFAULT_ACCOUNTING_DATE);
        return expenseUpload;
    }

    @Before
    public void initTest() {
        expenseUpload = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpenseUpload() throws Exception {
        int databaseSizeBeforeCreate = expenseUploadRepository.findAll().size();

        // Create the ExpenseUpload
        restExpenseUploadMockMvc.perform(post("/api/expense-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseUpload)))
            .andExpect(status().isCreated());

        // Validate the ExpenseUpload in the database
        List<ExpenseUpload> expenseUploadList = expenseUploadRepository.findAll();
        assertThat(expenseUploadList).hasSize(databaseSizeBeforeCreate + 1);
        ExpenseUpload testExpenseUpload = expenseUploadList.get(expenseUploadList.size() - 1);
        assertThat(testExpenseUpload.getFileName()).isEqualTo(DEFAULT_FILE_NAME);
        assertThat(testExpenseUpload.getStatusDate()).isEqualTo(DEFAULT_STATUS_DATE);
        assertThat(testExpenseUpload.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testExpenseUpload.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testExpenseUpload.getDateCreated()).isEqualTo(DEFAULT_DATE_CREATED);
        assertThat(testExpenseUpload.getAccountingDate()).isEqualTo(DEFAULT_ACCOUNTING_DATE);
    }

    @Test
    @Transactional
    public void createExpenseUploadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expenseUploadRepository.findAll().size();

        // Create the ExpenseUpload with an existing ID
        expenseUpload.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpenseUploadMockMvc.perform(post("/api/expense-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseUpload)))
            .andExpect(status().isBadRequest());

        // Validate the ExpenseUpload in the database
        List<ExpenseUpload> expenseUploadList = expenseUploadRepository.findAll();
        assertThat(expenseUploadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllExpenseUploads() throws Exception {
        // Initialize the database
        expenseUploadRepository.saveAndFlush(expenseUpload);

        // Get all the expenseUploadList
        restExpenseUploadMockMvc.perform(get("/api/expense-uploads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expenseUpload.getId().intValue())))
            .andExpect(jsonPath("$.[*].fileName").value(hasItem(DEFAULT_FILE_NAME.toString())))
            .andExpect(jsonPath("$.[*].statusDate").value(hasItem(DEFAULT_STATUS_DATE.toString())))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(DEFAULT_DATE_CREATED.toString())))
            .andExpect(jsonPath("$.[*].accountingDate").value(hasItem(DEFAULT_ACCOUNTING_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getExpenseUpload() throws Exception {
        // Initialize the database
        expenseUploadRepository.saveAndFlush(expenseUpload);

        // Get the expenseUpload
        restExpenseUploadMockMvc.perform(get("/api/expense-uploads/{id}", expenseUpload.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expenseUpload.getId().intValue()))
            .andExpect(jsonPath("$.fileName").value(DEFAULT_FILE_NAME.toString()))
            .andExpect(jsonPath("$.statusDate").value(DEFAULT_STATUS_DATE.toString()))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.dateCreated").value(DEFAULT_DATE_CREATED.toString()))
            .andExpect(jsonPath("$.accountingDate").value(DEFAULT_ACCOUNTING_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExpenseUpload() throws Exception {
        // Get the expenseUpload
        restExpenseUploadMockMvc.perform(get("/api/expense-uploads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpenseUpload() throws Exception {
        // Initialize the database
        expenseUploadRepository.saveAndFlush(expenseUpload);

        int databaseSizeBeforeUpdate = expenseUploadRepository.findAll().size();

        // Update the expenseUpload
        ExpenseUpload updatedExpenseUpload = expenseUploadRepository.findById(expenseUpload.getId()).get();
        // Disconnect from session so that the updates on updatedExpenseUpload are not directly saved in db
        em.detach(updatedExpenseUpload);
        updatedExpenseUpload
            .fileName(UPDATED_FILE_NAME)
            .statusDate(UPDATED_STATUS_DATE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .dateCreated(UPDATED_DATE_CREATED)
            .accountingDate(UPDATED_ACCOUNTING_DATE);

        restExpenseUploadMockMvc.perform(put("/api/expense-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExpenseUpload)))
            .andExpect(status().isOk());

        // Validate the ExpenseUpload in the database
        List<ExpenseUpload> expenseUploadList = expenseUploadRepository.findAll();
        assertThat(expenseUploadList).hasSize(databaseSizeBeforeUpdate);
        ExpenseUpload testExpenseUpload = expenseUploadList.get(expenseUploadList.size() - 1);
        assertThat(testExpenseUpload.getFileName()).isEqualTo(UPDATED_FILE_NAME);
        assertThat(testExpenseUpload.getStatusDate()).isEqualTo(UPDATED_STATUS_DATE);
        assertThat(testExpenseUpload.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testExpenseUpload.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testExpenseUpload.getDateCreated()).isEqualTo(UPDATED_DATE_CREATED);
        assertThat(testExpenseUpload.getAccountingDate()).isEqualTo(UPDATED_ACCOUNTING_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingExpenseUpload() throws Exception {
        int databaseSizeBeforeUpdate = expenseUploadRepository.findAll().size();

        // Create the ExpenseUpload

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpenseUploadMockMvc.perform(put("/api/expense-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseUpload)))
            .andExpect(status().isBadRequest());

        // Validate the ExpenseUpload in the database
        List<ExpenseUpload> expenseUploadList = expenseUploadRepository.findAll();
        assertThat(expenseUploadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExpenseUpload() throws Exception {
        // Initialize the database
        expenseUploadRepository.saveAndFlush(expenseUpload);

        int databaseSizeBeforeDelete = expenseUploadRepository.findAll().size();

        // Delete the expenseUpload
        restExpenseUploadMockMvc.perform(delete("/api/expense-uploads/{id}", expenseUpload.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ExpenseUpload> expenseUploadList = expenseUploadRepository.findAll();
        assertThat(expenseUploadList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExpenseUpload.class);
        ExpenseUpload expenseUpload1 = new ExpenseUpload();
        expenseUpload1.setId(1L);
        ExpenseUpload expenseUpload2 = new ExpenseUpload();
        expenseUpload2.setId(expenseUpload1.getId());
        assertThat(expenseUpload1).isEqualTo(expenseUpload2);
        expenseUpload2.setId(2L);
        assertThat(expenseUpload1).isNotEqualTo(expenseUpload2);
        expenseUpload1.setId(null);
        assertThat(expenseUpload1).isNotEqualTo(expenseUpload2);
    }
}
