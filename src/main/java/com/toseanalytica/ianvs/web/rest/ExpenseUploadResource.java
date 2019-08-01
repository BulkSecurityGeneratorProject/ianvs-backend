package com.toseanalytica.ianvs.web.rest;
import com.toseanalytica.ianvs.domain.ExpenseUpload;
import com.toseanalytica.ianvs.repository.ExpenseUploadRepository;
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
 * REST controller for managing ExpenseUpload.
 */
@RestController
@RequestMapping("/api")
public class ExpenseUploadResource {

    private final Logger log = LoggerFactory.getLogger(ExpenseUploadResource.class);

    private static final String ENTITY_NAME = "expenseUpload";

    private final ExpenseUploadRepository expenseUploadRepository;

    public ExpenseUploadResource(ExpenseUploadRepository expenseUploadRepository) {
        this.expenseUploadRepository = expenseUploadRepository;
    }

    /**
     * POST  /expense-uploads : Create a new expenseUpload.
     *
     * @param expenseUpload the expenseUpload to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expenseUpload, or with status 400 (Bad Request) if the expenseUpload has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/expense-uploads")
    public ResponseEntity<ExpenseUpload> createExpenseUpload(@RequestBody ExpenseUpload expenseUpload) throws URISyntaxException {
        log.debug("REST request to save ExpenseUpload : {}", expenseUpload);
        if (expenseUpload.getId() != null) {
            throw new BadRequestAlertException("A new expenseUpload cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExpenseUpload result = expenseUploadRepository.save(expenseUpload);
        return ResponseEntity.created(new URI("/api/expense-uploads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expense-uploads : Updates an existing expenseUpload.
     *
     * @param expenseUpload the expenseUpload to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expenseUpload,
     * or with status 400 (Bad Request) if the expenseUpload is not valid,
     * or with status 500 (Internal Server Error) if the expenseUpload couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/expense-uploads")
    public ResponseEntity<ExpenseUpload> updateExpenseUpload(@RequestBody ExpenseUpload expenseUpload) throws URISyntaxException {
        log.debug("REST request to update ExpenseUpload : {}", expenseUpload);
        if (expenseUpload.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExpenseUpload result = expenseUploadRepository.save(expenseUpload);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, expenseUpload.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expense-uploads : get all the expenseUploads.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expenseUploads in body
     */
    @GetMapping("/expense-uploads")
    public List<ExpenseUpload> getAllExpenseUploads() {
        log.debug("REST request to get all ExpenseUploads");
        return expenseUploadRepository.findAll();
    }

    /**
     * GET  /expense-uploads/:id : get the "id" expenseUpload.
     *
     * @param id the id of the expenseUpload to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expenseUpload, or with status 404 (Not Found)
     */
    @GetMapping("/expense-uploads/{id}")
    public ResponseEntity<ExpenseUpload> getExpenseUpload(@PathVariable Long id) {
        log.debug("REST request to get ExpenseUpload : {}", id);
        Optional<ExpenseUpload> expenseUpload = expenseUploadRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(expenseUpload);
    }

    /**
     * DELETE  /expense-uploads/:id : delete the "id" expenseUpload.
     *
     * @param id the id of the expenseUpload to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/expense-uploads/{id}")
    public ResponseEntity<Void> deleteExpenseUpload(@PathVariable Long id) {
        log.debug("REST request to delete ExpenseUpload : {}", id);
        expenseUploadRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
