package com.toseanalytica.ianvs.web.rest;

import com.toseanalytica.ianvs.IanvsApp;

import com.toseanalytica.ianvs.domain.IncomeCapture;
import com.toseanalytica.ianvs.repository.IncomeCaptureRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.toseanalytica.ianvs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IncomeCaptureResource REST controller.
 *
 * @see IncomeCaptureResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IanvsApp.class)
public class IncomeCaptureResourceIntTest {

    private static final String DEFAULT_SALES_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SALES_CODE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DOCUMENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DOCUMENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CUSTOMER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CUSTOMER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CUSTOMER_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_CUSTOMER_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_CUSTOMER_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_CUSTOMER_MOBILE = "BBBBBBBBBB";

    private static final String DEFAULT_CUSTOMER_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_CUSTOMER_ADDRESS = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_UPLOADED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_UPLOADED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private IncomeCaptureRepository incomeCaptureRepository;

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

    private MockMvc restIncomeCaptureMockMvc;

    private IncomeCapture incomeCapture;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IncomeCaptureResource incomeCaptureResource = new IncomeCaptureResource(incomeCaptureRepository);
        this.restIncomeCaptureMockMvc = MockMvcBuilders.standaloneSetup(incomeCaptureResource)
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
    public static IncomeCapture createEntity(EntityManager em) {
        IncomeCapture incomeCapture = new IncomeCapture()
            .salesCode(DEFAULT_SALES_CODE)
            .documentDate(DEFAULT_DOCUMENT_DATE)
            .customerName(DEFAULT_CUSTOMER_NAME)
            .customerEmail(DEFAULT_CUSTOMER_EMAIL)
            .customerMobile(DEFAULT_CUSTOMER_MOBILE)
            .customerAddress(DEFAULT_CUSTOMER_ADDRESS)
            .dateUploaded(DEFAULT_DATE_UPLOADED);
        return incomeCapture;
    }

    @Before
    public void initTest() {
        incomeCapture = createEntity(em);
    }

    @Test
    @Transactional
    public void createIncomeCapture() throws Exception {
        int databaseSizeBeforeCreate = incomeCaptureRepository.findAll().size();

        // Create the IncomeCapture
        restIncomeCaptureMockMvc.perform(post("/api/income-captures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incomeCapture)))
            .andExpect(status().isCreated());

        // Validate the IncomeCapture in the database
        List<IncomeCapture> incomeCaptureList = incomeCaptureRepository.findAll();
        assertThat(incomeCaptureList).hasSize(databaseSizeBeforeCreate + 1);
        IncomeCapture testIncomeCapture = incomeCaptureList.get(incomeCaptureList.size() - 1);
        assertThat(testIncomeCapture.getSalesCode()).isEqualTo(DEFAULT_SALES_CODE);
        assertThat(testIncomeCapture.getDocumentDate()).isEqualTo(DEFAULT_DOCUMENT_DATE);
        assertThat(testIncomeCapture.getCustomerName()).isEqualTo(DEFAULT_CUSTOMER_NAME);
        assertThat(testIncomeCapture.getCustomerEmail()).isEqualTo(DEFAULT_CUSTOMER_EMAIL);
        assertThat(testIncomeCapture.getCustomerMobile()).isEqualTo(DEFAULT_CUSTOMER_MOBILE);
        assertThat(testIncomeCapture.getCustomerAddress()).isEqualTo(DEFAULT_CUSTOMER_ADDRESS);
        assertThat(testIncomeCapture.getDateUploaded()).isEqualTo(DEFAULT_DATE_UPLOADED);
    }

    @Test
    @Transactional
    public void createIncomeCaptureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = incomeCaptureRepository.findAll().size();

        // Create the IncomeCapture with an existing ID
        incomeCapture.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIncomeCaptureMockMvc.perform(post("/api/income-captures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incomeCapture)))
            .andExpect(status().isBadRequest());

        // Validate the IncomeCapture in the database
        List<IncomeCapture> incomeCaptureList = incomeCaptureRepository.findAll();
        assertThat(incomeCaptureList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIncomeCaptures() throws Exception {
        // Initialize the database
        incomeCaptureRepository.saveAndFlush(incomeCapture);

        // Get all the incomeCaptureList
        restIncomeCaptureMockMvc.perform(get("/api/income-captures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(incomeCapture.getId().intValue())))
            .andExpect(jsonPath("$.[*].salesCode").value(hasItem(DEFAULT_SALES_CODE.toString())))
            .andExpect(jsonPath("$.[*].documentDate").value(hasItem(DEFAULT_DOCUMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].customerName").value(hasItem(DEFAULT_CUSTOMER_NAME.toString())))
            .andExpect(jsonPath("$.[*].customerEmail").value(hasItem(DEFAULT_CUSTOMER_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].customerMobile").value(hasItem(DEFAULT_CUSTOMER_MOBILE.toString())))
            .andExpect(jsonPath("$.[*].customerAddress").value(hasItem(DEFAULT_CUSTOMER_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].dateUploaded").value(hasItem(DEFAULT_DATE_UPLOADED.toString())));
    }
    
    @Test
    @Transactional
    public void getIncomeCapture() throws Exception {
        // Initialize the database
        incomeCaptureRepository.saveAndFlush(incomeCapture);

        // Get the incomeCapture
        restIncomeCaptureMockMvc.perform(get("/api/income-captures/{id}", incomeCapture.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(incomeCapture.getId().intValue()))
            .andExpect(jsonPath("$.salesCode").value(DEFAULT_SALES_CODE.toString()))
            .andExpect(jsonPath("$.documentDate").value(DEFAULT_DOCUMENT_DATE.toString()))
            .andExpect(jsonPath("$.customerName").value(DEFAULT_CUSTOMER_NAME.toString()))
            .andExpect(jsonPath("$.customerEmail").value(DEFAULT_CUSTOMER_EMAIL.toString()))
            .andExpect(jsonPath("$.customerMobile").value(DEFAULT_CUSTOMER_MOBILE.toString()))
            .andExpect(jsonPath("$.customerAddress").value(DEFAULT_CUSTOMER_ADDRESS.toString()))
            .andExpect(jsonPath("$.dateUploaded").value(DEFAULT_DATE_UPLOADED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIncomeCapture() throws Exception {
        // Get the incomeCapture
        restIncomeCaptureMockMvc.perform(get("/api/income-captures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIncomeCapture() throws Exception {
        // Initialize the database
        incomeCaptureRepository.saveAndFlush(incomeCapture);

        int databaseSizeBeforeUpdate = incomeCaptureRepository.findAll().size();

        // Update the incomeCapture
        IncomeCapture updatedIncomeCapture = incomeCaptureRepository.findById(incomeCapture.getId()).get();
        // Disconnect from session so that the updates on updatedIncomeCapture are not directly saved in db
        em.detach(updatedIncomeCapture);
        updatedIncomeCapture
            .salesCode(UPDATED_SALES_CODE)
            .documentDate(UPDATED_DOCUMENT_DATE)
            .customerName(UPDATED_CUSTOMER_NAME)
            .customerEmail(UPDATED_CUSTOMER_EMAIL)
            .customerMobile(UPDATED_CUSTOMER_MOBILE)
            .customerAddress(UPDATED_CUSTOMER_ADDRESS)
            .dateUploaded(UPDATED_DATE_UPLOADED);

        restIncomeCaptureMockMvc.perform(put("/api/income-captures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIncomeCapture)))
            .andExpect(status().isOk());

        // Validate the IncomeCapture in the database
        List<IncomeCapture> incomeCaptureList = incomeCaptureRepository.findAll();
        assertThat(incomeCaptureList).hasSize(databaseSizeBeforeUpdate);
        IncomeCapture testIncomeCapture = incomeCaptureList.get(incomeCaptureList.size() - 1);
        assertThat(testIncomeCapture.getSalesCode()).isEqualTo(UPDATED_SALES_CODE);
        assertThat(testIncomeCapture.getDocumentDate()).isEqualTo(UPDATED_DOCUMENT_DATE);
        assertThat(testIncomeCapture.getCustomerName()).isEqualTo(UPDATED_CUSTOMER_NAME);
        assertThat(testIncomeCapture.getCustomerEmail()).isEqualTo(UPDATED_CUSTOMER_EMAIL);
        assertThat(testIncomeCapture.getCustomerMobile()).isEqualTo(UPDATED_CUSTOMER_MOBILE);
        assertThat(testIncomeCapture.getCustomerAddress()).isEqualTo(UPDATED_CUSTOMER_ADDRESS);
        assertThat(testIncomeCapture.getDateUploaded()).isEqualTo(UPDATED_DATE_UPLOADED);
    }

    @Test
    @Transactional
    public void updateNonExistingIncomeCapture() throws Exception {
        int databaseSizeBeforeUpdate = incomeCaptureRepository.findAll().size();

        // Create the IncomeCapture

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIncomeCaptureMockMvc.perform(put("/api/income-captures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incomeCapture)))
            .andExpect(status().isBadRequest());

        // Validate the IncomeCapture in the database
        List<IncomeCapture> incomeCaptureList = incomeCaptureRepository.findAll();
        assertThat(incomeCaptureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIncomeCapture() throws Exception {
        // Initialize the database
        incomeCaptureRepository.saveAndFlush(incomeCapture);

        int databaseSizeBeforeDelete = incomeCaptureRepository.findAll().size();

        // Delete the incomeCapture
        restIncomeCaptureMockMvc.perform(delete("/api/income-captures/{id}", incomeCapture.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IncomeCapture> incomeCaptureList = incomeCaptureRepository.findAll();
        assertThat(incomeCaptureList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IncomeCapture.class);
        IncomeCapture incomeCapture1 = new IncomeCapture();
        incomeCapture1.setId(1L);
        IncomeCapture incomeCapture2 = new IncomeCapture();
        incomeCapture2.setId(incomeCapture1.getId());
        assertThat(incomeCapture1).isEqualTo(incomeCapture2);
        incomeCapture2.setId(2L);
        assertThat(incomeCapture1).isNotEqualTo(incomeCapture2);
        incomeCapture1.setId(null);
        assertThat(incomeCapture1).isNotEqualTo(incomeCapture2);
    }
}
