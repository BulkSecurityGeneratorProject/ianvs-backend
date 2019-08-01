package com.toseanalytica.ianvs.web.rest;
import com.toseanalytica.ianvs.domain.ExpenseCategory;
import com.toseanalytica.ianvs.repository.ExpenseCategoryRepository;
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
 * REST controller for managing ExpenseCategory.
 */
@RestController
@RequestMapping("/api")
public class ExpenseCategoryResource {

    private final Logger log = LoggerFactory.getLogger(ExpenseCategoryResource.class);

    private static final String ENTITY_NAME = "expenseCategory";

    private final ExpenseCategoryRepository expenseCategoryRepository;

    public ExpenseCategoryResource(ExpenseCategoryRepository expenseCategoryRepository) {
        this.expenseCategoryRepository = expenseCategoryRepository;
    }

    /**
     * POST  /expense-categories : Create a new expenseCategory.
     *
     * @param expenseCategory the expenseCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expenseCategory, or with status 400 (Bad Request) if the expenseCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/expense-categories")
    public ResponseEntity<ExpenseCategory> createExpenseCategory(@RequestBody ExpenseCategory expenseCategory) throws URISyntaxException {
        log.debug("REST request to save ExpenseCategory : {}", expenseCategory);
        if (expenseCategory.getId() != null) {
            throw new BadRequestAlertException("A new expenseCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExpenseCategory result = expenseCategoryRepository.save(expenseCategory);
        return ResponseEntity.created(new URI("/api/expense-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expense-categories : Updates an existing expenseCategory.
     *
     * @param expenseCategory the expenseCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expenseCategory,
     * or with status 400 (Bad Request) if the expenseCategory is not valid,
     * or with status 500 (Internal Server Error) if the expenseCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/expense-categories")
    public ResponseEntity<ExpenseCategory> updateExpenseCategory(@RequestBody ExpenseCategory expenseCategory) throws URISyntaxException {
        log.debug("REST request to update ExpenseCategory : {}", expenseCategory);
        if (expenseCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExpenseCategory result = expenseCategoryRepository.save(expenseCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, expenseCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expense-categories : get all the expenseCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expenseCategories in body
     */
    @GetMapping("/expense-categories")
    public List<ExpenseCategory> getAllExpenseCategories() {
        log.debug("REST request to get all ExpenseCategories");
        return expenseCategoryRepository.findAll();
    }

    /**
     * GET  /expense-categories/:id : get the "id" expenseCategory.
     *
     * @param id the id of the expenseCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expenseCategory, or with status 404 (Not Found)
     */
    @GetMapping("/expense-categories/{id}")
    public ResponseEntity<ExpenseCategory> getExpenseCategory(@PathVariable Long id) {
        log.debug("REST request to get ExpenseCategory : {}", id);
        Optional<ExpenseCategory> expenseCategory = expenseCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(expenseCategory);
    }

    /**
     * DELETE  /expense-categories/:id : delete the "id" expenseCategory.
     *
     * @param id the id of the expenseCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/expense-categories/{id}")
    public ResponseEntity<Void> deleteExpenseCategory(@PathVariable Long id) {
        log.debug("REST request to delete ExpenseCategory : {}", id);
        expenseCategoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
