package com.toseanalytica.ianvs.web.rest;
import com.toseanalytica.ianvs.domain.IncomePayments;
import com.toseanalytica.ianvs.repository.IncomePaymentsRepository;
import com.toseanalytica.ianvs.web.rest.errors.BadRequestAlertException;
import com.toseanalytica.ianvs.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing IncomePayments.
 */
@RestController
@RequestMapping("/api")
public class IncomePaymentsResource {

    private final Logger log = LoggerFactory.getLogger(IncomePaymentsResource.class);

    private static final String ENTITY_NAME = "incomePayments";

    private final IncomePaymentsRepository incomePaymentsRepository;

    public IncomePaymentsResource(IncomePaymentsRepository incomePaymentsRepository) {
        this.incomePaymentsRepository = incomePaymentsRepository;
    }

    /**
     * POST  /income-payments : Create a new incomePayments.
     *
     * @param incomePayments the incomePayments to create
     * @return the ResponseEntity with status 201 (Created) and with body the new incomePayments, or with status 400 (Bad Request) if the incomePayments has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/income-payments")
    public ResponseEntity<IncomePayments> createIncomePayments(@RequestBody IncomePayments incomePayments) throws URISyntaxException {
        log.debug("REST request to save IncomePayments : {}", incomePayments);
        if (incomePayments.getId() != null) {
            throw new BadRequestAlertException("A new incomePayments cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IncomePayments result = incomePaymentsRepository.save(incomePayments);
        return ResponseEntity.created(new URI("/api/income-payments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /income-payments : Updates an existing incomePayments.
     *
     * @param incomePayments the incomePayments to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated incomePayments,
     * or with status 400 (Bad Request) if the incomePayments is not valid,
     * or with status 500 (Internal Server Error) if the incomePayments couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/income-payments")
    public ResponseEntity<IncomePayments> updateIncomePayments(@RequestBody IncomePayments incomePayments) throws URISyntaxException {
        log.debug("REST request to update IncomePayments : {}", incomePayments);
        if (incomePayments.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IncomePayments result = incomePaymentsRepository.save(incomePayments);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, incomePayments.getId().toString()))
            .body(result);
    }

    /**
     * GET  /income-payments : get all the incomePayments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of incomePayments in body
     */
    @GetMapping("/income-payments")
    public List<IncomePayments> getAllIncomePayments() {
        log.debug("REST request to get all IncomePayments");
        return incomePaymentsRepository.findAll();
    }

    /**
     * GET  /income-payments/:id : get the "id" incomePayments.
     *
     * @param id the id of the incomePayments to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the incomePayments, or with status 404 (Not Found)
     */
    @GetMapping("/income-payments/{id}")
    public ResponseEntity<IncomePayments> getIncomePayments(@PathVariable Long id) {
        log.debug("REST request to get IncomePayments : {}", id);
        Optional<IncomePayments> incomePayments = incomePaymentsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(incomePayments);
    }

    /**
     * DELETE  /income-payments/:id : delete the "id" incomePayments.
     *
     * @param id the id of the incomePayments to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/income-payments/{id}")
    public ResponseEntity<Void> deleteIncomePayments(@PathVariable Long id) {
        log.debug("REST request to delete IncomePayments : {}", id);
        incomePaymentsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
