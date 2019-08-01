package com.toseanalytica.ianvs.web.rest;
import com.toseanalytica.ianvs.domain.ExpenseStatus;
import com.toseanalytica.ianvs.repository.ExpenseStatusRepository;
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
 * REST controller for managing ExpenseStatus.
 */
@RestController
@RequestMapping("/api")
public class ExpenseStatusResource {

    private final Logger log = LoggerFactory.getLogger(ExpenseStatusResource.class);

    private static final String ENTITY_NAME = "expenseStatus";

    private final ExpenseStatusRepository expenseStatusRepository;

    public ExpenseStatusResource(ExpenseStatusRepository expenseStatusRepository) {
        this.expenseStatusRepository = expenseStatusRepository;
    }

    /**
     * POST  /expense-statuses : Create a new expenseStatus.
     *
     * @param expenseStatus the expenseStatus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expenseStatus, or with status 400 (Bad Request) if the expenseStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/expense-statuses")
    public ResponseEntity<ExpenseStatus> createExpenseStatus(@RequestBody ExpenseStatus expenseStatus) throws URISyntaxException {
        log.debug("REST request to save ExpenseStatus : {}", expenseStatus);
        if (expenseStatus.getId() != null) {
            throw new BadRequestAlertException("A new expenseStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExpenseStatus result = expenseStatusRepository.save(expenseStatus);
        return ResponseEntity.created(new URI("/api/expense-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expense-statuses : Updates an existing expenseStatus.
     *
     * @param expenseStatus the expenseStatus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expenseStatus,
     * or with status 400 (Bad Request) if the expenseStatus is not valid,
     * or with status 500 (Internal Server Error) if the expenseStatus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/expense-statuses")
    public ResponseEntity<ExpenseStatus> updateExpenseStatus(@RequestBody ExpenseStatus expenseStatus) throws URISyntaxException {
        log.debug("REST request to update ExpenseStatus : {}", expenseStatus);
        if (expenseStatus.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExpenseStatus result = expenseStatusRepository.save(expenseStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, expenseStatus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expense-statuses : get all the expenseStatuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expenseStatuses in body
     */
    @GetMapping("/expense-statuses")
    public List<ExpenseStatus> getAllExpenseStatuses() {
        log.debug("REST request to get all ExpenseStatuses");
        return expenseStatusRepository.findAll();
    }

    /**
     * GET  /expense-statuses/:id : get the "id" expenseStatus.
     *
     * @param id the id of the expenseStatus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expenseStatus, or with status 404 (Not Found)
     */
    @GetMapping("/expense-statuses/{id}")
    public ResponseEntity<ExpenseStatus> getExpenseStatus(@PathVariable Long id) {
        log.debug("REST request to get ExpenseStatus : {}", id);
        Optional<ExpenseStatus> expenseStatus = expenseStatusRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(expenseStatus);
    }

    /**
     * DELETE  /expense-statuses/:id : delete the "id" expenseStatus.
     *
     * @param id the id of the expenseStatus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/expense-statuses/{id}")
    public ResponseEntity<Void> deleteExpenseStatus(@PathVariable Long id) {
        log.debug("REST request to delete ExpenseStatus : {}", id);
        expenseStatusRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
