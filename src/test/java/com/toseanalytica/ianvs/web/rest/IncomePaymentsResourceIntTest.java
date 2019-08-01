package com.toseanalytica.ianvs.web.rest;

import com.toseanalytica.ianvs.IanvsApp;

import com.toseanalytica.ianvs.domain.IncomePayments;
import com.toseanalytica.ianvs.repository.IncomePaymentsRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.toseanalytica.ianvs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IncomePaymentsResource REST controller.
 *
 * @see IncomePaymentsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IanvsApp.class)
public class IncomePaymentsResourceIntTest {

    private static final Float DEFAULT_AMOUNT_PAID = 1F;
    private static final Float UPDATED_AMOUNT_PAID = 2F;

    private static final Float DEFAULT_AMOUNT_OUTSTANDING = 1F;
    private static final Float UPDATED_AMOUNT_OUTSTANDING = 2F;

    private static final LocalDate DEFAULT_OUTSTANDING_PAYMENT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_OUTSTANDING_PAYMENT_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private IncomePaymentsRepository incomePaymentsRepository;

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

    private MockMvc restIncomePaymentsMockMvc;

    private IncomePayments incomePayments;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IncomePaymentsResource incomePaymentsResource = new IncomePaymentsResource(incomePaymentsRepository);
        this.restIncomePaymentsMockMvc = MockMvcBuilders.standaloneSetup(incomePaymentsResource)
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
    public static IncomePayments createEntity(EntityManager em) {
        IncomePayments incomePayments = new IncomePayments()
            .amountPaid(DEFAULT_AMOUNT_PAID)
            .amountOutstanding(DEFAULT_AMOUNT_OUTSTANDING)
            .outstandingPaymentDate(DEFAULT_OUTSTANDING_PAYMENT_DATE);
        return incomePayments;
    }

    @Before
    public void initTest() {
        incomePayments = createEntity(em);
    }

    @Test
    @Transactional
    public void createIncomePayments() throws Exception {
        int databaseSizeBeforeCreate = incomePaymentsRepository.findAll().size();

        // Create the IncomePayments
        restIncomePaymentsMockMvc.perform(post("/api/income-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incomePayments)))
            .andExpect(status().isCreated());

        // Validate the IncomePayments in the database
        List<IncomePayments> incomePaymentsList = incomePaymentsRepository.findAll();
        assertThat(incomePaymentsList).hasSize(databaseSizeBeforeCreate + 1);
        IncomePayments testIncomePayments = incomePaymentsList.get(incomePaymentsList.size() - 1);
        assertThat(testIncomePayments.getAmountPaid()).isEqualTo(DEFAULT_AMOUNT_PAID);
        assertThat(testIncomePayments.getAmountOutstanding()).isEqualTo(DEFAULT_AMOUNT_OUTSTANDING);
        assertThat(testIncomePayments.getOutstandingPaymentDate()).isEqualTo(DEFAULT_OUTSTANDING_PAYMENT_DATE);
    }

    @Test
    @Transactional
    public void createIncomePaymentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = incomePaymentsRepository.findAll().size();

        // Create the IncomePayments with an existing ID
        incomePayments.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIncomePaymentsMockMvc.perform(post("/api/income-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incomePayments)))
            .andExpect(status().isBadRequest());

        // Validate the IncomePayments in the database
        List<IncomePayments> incomePaymentsList = incomePaymentsRepository.findAll();
        assertThat(incomePaymentsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIncomePayments() throws Exception {
        // Initialize the database
        incomePaymentsRepository.saveAndFlush(incomePayments);

        // Get all the incomePaymentsList
        restIncomePaymentsMockMvc.perform(get("/api/income-payments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(incomePayments.getId().intValue())))
            .andExpect(jsonPath("$.[*].amountPaid").value(hasItem(DEFAULT_AMOUNT_PAID.doubleValue())))
            .andExpect(jsonPath("$.[*].amountOutstanding").value(hasItem(DEFAULT_AMOUNT_OUTSTANDING.doubleValue())))
            .andExpect(jsonPath("$.[*].outstandingPaymentDate").value(hasItem(DEFAULT_OUTSTANDING_PAYMENT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getIncomePayments() throws Exception {
        // Initialize the database
        incomePaymentsRepository.saveAndFlush(incomePayments);

        // Get the incomePayments
        restIncomePaymentsMockMvc.perform(get("/api/income-payments/{id}", incomePayments.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(incomePayments.getId().intValue()))
            .andExpect(jsonPath("$.amountPaid").value(DEFAULT_AMOUNT_PAID.doubleValue()))
            .andExpect(jsonPath("$.amountOutstanding").value(DEFAULT_AMOUNT_OUTSTANDING.doubleValue()))
            .andExpect(jsonPath("$.outstandingPaymentDate").value(DEFAULT_OUTSTANDING_PAYMENT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIncomePayments() throws Exception {
        // Get the incomePayments
        restIncomePaymentsMockMvc.perform(get("/api/income-payments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIncomePayments() throws Exception {
        // Initialize the database
        incomePaymentsRepository.saveAndFlush(incomePayments);

        int databaseSizeBeforeUpdate = incomePaymentsRepository.findAll().size();

        // Update the incomePayments
        IncomePayments updatedIncomePayments = incomePaymentsRepository.findById(incomePayments.getId()).get();
        // Disconnect from session so that the updates on updatedIncomePayments are not directly saved in db
        em.detach(updatedIncomePayments);
        updatedIncomePayments
            .amountPaid(UPDATED_AMOUNT_PAID)
            .amountOutstanding(UPDATED_AMOUNT_OUTSTANDING)
            .outstandingPaymentDate(UPDATED_OUTSTANDING_PAYMENT_DATE);

        restIncomePaymentsMockMvc.perform(put("/api/income-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIncomePayments)))
            .andExpect(status().isOk());

        // Validate the IncomePayments in the database
        List<IncomePayments> incomePaymentsList = incomePaymentsRepository.findAll();
        assertThat(incomePaymentsList).hasSize(databaseSizeBeforeUpdate);
        IncomePayments testIncomePayments = incomePaymentsList.get(incomePaymentsList.size() - 1);
        assertThat(testIncomePayments.getAmountPaid()).isEqualTo(UPDATED_AMOUNT_PAID);
        assertThat(testIncomePayments.getAmountOutstanding()).isEqualTo(UPDATED_AMOUNT_OUTSTANDING);
        assertThat(testIncomePayments.getOutstandingPaymentDate()).isEqualTo(UPDATED_OUTSTANDING_PAYMENT_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingIncomePayments() throws Exception {
        int databaseSizeBeforeUpdate = incomePaymentsRepository.findAll().size();

        // Create the IncomePayments

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIncomePaymentsMockMvc.perform(put("/api/income-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incomePayments)))
            .andExpect(status().isBadRequest());

        // Validate the IncomePayments in the database
        List<IncomePayments> incomePaymentsList = incomePaymentsRepository.findAll();
        assertThat(incomePaymentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIncomePayments() throws Exception {
        // Initialize the database
        incomePaymentsRepository.saveAndFlush(incomePayments);

        int databaseSizeBeforeDelete = incomePaymentsRepository.findAll().size();

        // Delete the incomePayments
        restIncomePaymentsMockMvc.perform(delete("/api/income-payments/{id}", incomePayments.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IncomePayments> incomePaymentsList = incomePaymentsRepository.findAll();
        assertThat(incomePaymentsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IncomePayments.class);
        IncomePayments incomePayments1 = new IncomePayments();
        incomePayments1.setId(1L);
        IncomePayments incomePayments2 = new IncomePayments();
        incomePayments2.setId(incomePayments1.getId());
        assertThat(incomePayments1).isEqualTo(incomePayments2);
        incomePayments2.setId(2L);
        assertThat(incomePayments1).isNotEqualTo(incomePayments2);
        incomePayments1.setId(null);
        assertThat(incomePayments1).isNotEqualTo(incomePayments2);
    }
}
