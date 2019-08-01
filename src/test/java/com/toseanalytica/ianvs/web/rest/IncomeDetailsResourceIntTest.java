package com.toseanalytica.ianvs.web.rest;

import com.toseanalytica.ianvs.IanvsApp;

import com.toseanalytica.ianvs.domain.IncomeDetails;
import com.toseanalytica.ianvs.repository.IncomeDetailsRepository;
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
 * Test class for the IncomeDetailsResource REST controller.
 *
 * @see IncomeDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IanvsApp.class)
public class IncomeDetailsResourceIntTest {

    private static final String DEFAULT_ITEM_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_ITEM_DESCRIPTION = "BBBBBBBBBB";

    private static final Float DEFAULT_UNIT_PRICE = 1F;
    private static final Float UPDATED_UNIT_PRICE = 2F;

    private static final Float DEFAULT_QUANTITY = 1F;
    private static final Float UPDATED_QUANTITY = 2F;

    private static final Float DEFAULT_TOTAL_VAT = 1F;
    private static final Float UPDATED_TOTAL_VAT = 2F;

    private static final Float DEFAULT_TOTAL_PRICE = 1F;
    private static final Float UPDATED_TOTAL_PRICE = 2F;

    @Autowired
    private IncomeDetailsRepository incomeDetailsRepository;

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

    private MockMvc restIncomeDetailsMockMvc;

    private IncomeDetails incomeDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IncomeDetailsResource incomeDetailsResource = new IncomeDetailsResource(incomeDetailsRepository);
        this.restIncomeDetailsMockMvc = MockMvcBuilders.standaloneSetup(incomeDetailsResource)
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
    public static IncomeDetails createEntity(EntityManager em) {
        IncomeDetails incomeDetails = new IncomeDetails()
            .itemDescription(DEFAULT_ITEM_DESCRIPTION)
            .unitPrice(DEFAULT_UNIT_PRICE)
            .quantity(DEFAULT_QUANTITY)
            .totalVat(DEFAULT_TOTAL_VAT)
            .totalPrice(DEFAULT_TOTAL_PRICE);
        return incomeDetails;
    }

    @Before
    public void initTest() {
        incomeDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createIncomeDetails() throws Exception {
        int databaseSizeBeforeCreate = incomeDetailsRepository.findAll().size();

        // Create the IncomeDetails
        restIncomeDetailsMockMvc.perform(post("/api/income-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incomeDetails)))
            .andExpect(status().isCreated());

        // Validate the IncomeDetails in the database
        List<IncomeDetails> incomeDetailsList = incomeDetailsRepository.findAll();
        assertThat(incomeDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        IncomeDetails testIncomeDetails = incomeDetailsList.get(incomeDetailsList.size() - 1);
        assertThat(testIncomeDetails.getItemDescription()).isEqualTo(DEFAULT_ITEM_DESCRIPTION);
        assertThat(testIncomeDetails.getUnitPrice()).isEqualTo(DEFAULT_UNIT_PRICE);
        assertThat(testIncomeDetails.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testIncomeDetails.getTotalVat()).isEqualTo(DEFAULT_TOTAL_VAT);
        assertThat(testIncomeDetails.getTotalPrice()).isEqualTo(DEFAULT_TOTAL_PRICE);
    }

    @Test
    @Transactional
    public void createIncomeDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = incomeDetailsRepository.findAll().size();

        // Create the IncomeDetails with an existing ID
        incomeDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIncomeDetailsMockMvc.perform(post("/api/income-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incomeDetails)))
            .andExpect(status().isBadRequest());

        // Validate the IncomeDetails in the database
        List<IncomeDetails> incomeDetailsList = incomeDetailsRepository.findAll();
        assertThat(incomeDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIncomeDetails() throws Exception {
        // Initialize the database
        incomeDetailsRepository.saveAndFlush(incomeDetails);

        // Get all the incomeDetailsList
        restIncomeDetailsMockMvc.perform(get("/api/income-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(incomeDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].itemDescription").value(hasItem(DEFAULT_ITEM_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.doubleValue())))
            .andExpect(jsonPath("$.[*].totalVat").value(hasItem(DEFAULT_TOTAL_VAT.doubleValue())))
            .andExpect(jsonPath("$.[*].totalPrice").value(hasItem(DEFAULT_TOTAL_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getIncomeDetails() throws Exception {
        // Initialize the database
        incomeDetailsRepository.saveAndFlush(incomeDetails);

        // Get the incomeDetails
        restIncomeDetailsMockMvc.perform(get("/api/income-details/{id}", incomeDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(incomeDetails.getId().intValue()))
            .andExpect(jsonPath("$.itemDescription").value(DEFAULT_ITEM_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.unitPrice").value(DEFAULT_UNIT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.doubleValue()))
            .andExpect(jsonPath("$.totalVat").value(DEFAULT_TOTAL_VAT.doubleValue()))
            .andExpect(jsonPath("$.totalPrice").value(DEFAULT_TOTAL_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingIncomeDetails() throws Exception {
        // Get the incomeDetails
        restIncomeDetailsMockMvc.perform(get("/api/income-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIncomeDetails() throws Exception {
        // Initialize the database
        incomeDetailsRepository.saveAndFlush(incomeDetails);

        int databaseSizeBeforeUpdate = incomeDetailsRepository.findAll().size();

        // Update the incomeDetails
        IncomeDetails updatedIncomeDetails = incomeDetailsRepository.findById(incomeDetails.getId()).get();
        // Disconnect from session so that the updates on updatedIncomeDetails are not directly saved in db
        em.detach(updatedIncomeDetails);
        updatedIncomeDetails
            .itemDescription(UPDATED_ITEM_DESCRIPTION)
            .unitPrice(UPDATED_UNIT_PRICE)
            .quantity(UPDATED_QUANTITY)
            .totalVat(UPDATED_TOTAL_VAT)
            .totalPrice(UPDATED_TOTAL_PRICE);

        restIncomeDetailsMockMvc.perform(put("/api/income-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIncomeDetails)))
            .andExpect(status().isOk());

        // Validate the IncomeDetails in the database
        List<IncomeDetails> incomeDetailsList = incomeDetailsRepository.findAll();
        assertThat(incomeDetailsList).hasSize(databaseSizeBeforeUpdate);
        IncomeDetails testIncomeDetails = incomeDetailsList.get(incomeDetailsList.size() - 1);
        assertThat(testIncomeDetails.getItemDescription()).isEqualTo(UPDATED_ITEM_DESCRIPTION);
        assertThat(testIncomeDetails.getUnitPrice()).isEqualTo(UPDATED_UNIT_PRICE);
        assertThat(testIncomeDetails.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testIncomeDetails.getTotalVat()).isEqualTo(UPDATED_TOTAL_VAT);
        assertThat(testIncomeDetails.getTotalPrice()).isEqualTo(UPDATED_TOTAL_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingIncomeDetails() throws Exception {
        int databaseSizeBeforeUpdate = incomeDetailsRepository.findAll().size();

        // Create the IncomeDetails

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIncomeDetailsMockMvc.perform(put("/api/income-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incomeDetails)))
            .andExpect(status().isBadRequest());

        // Validate the IncomeDetails in the database
        List<IncomeDetails> incomeDetailsList = incomeDetailsRepository.findAll();
        assertThat(incomeDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIncomeDetails() throws Exception {
        // Initialize the database
        incomeDetailsRepository.saveAndFlush(incomeDetails);

        int databaseSizeBeforeDelete = incomeDetailsRepository.findAll().size();

        // Delete the incomeDetails
        restIncomeDetailsMockMvc.perform(delete("/api/income-details/{id}", incomeDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IncomeDetails> incomeDetailsList = incomeDetailsRepository.findAll();
        assertThat(incomeDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IncomeDetails.class);
        IncomeDetails incomeDetails1 = new IncomeDetails();
        incomeDetails1.setId(1L);
        IncomeDetails incomeDetails2 = new IncomeDetails();
        incomeDetails2.setId(incomeDetails1.getId());
        assertThat(incomeDetails1).isEqualTo(incomeDetails2);
        incomeDetails2.setId(2L);
        assertThat(incomeDetails1).isNotEqualTo(incomeDetails2);
        incomeDetails1.setId(null);
        assertThat(incomeDetails1).isNotEqualTo(incomeDetails2);
    }
}
