package com.toseanalytica.ianvs.web.rest;
import com.toseanalytica.ianvs.domain.IncomeCategory;
import com.toseanalytica.ianvs.repository.IncomeCategoryRepository;
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
 * REST controller for managing IncomeCategory.
 */
@RestController
@RequestMapping("/api")
public class IncomeCategoryResource {

    private final Logger log = LoggerFactory.getLogger(IncomeCategoryResource.class);

    private static final String ENTITY_NAME = "incomeCategory";

    private final IncomeCategoryRepository incomeCategoryRepository;

    public IncomeCategoryResource(IncomeCategoryRepository incomeCategoryRepository) {
        this.incomeCategoryRepository = incomeCategoryRepository;
    }

    /**
     * POST  /income-categories : Create a new incomeCategory.
     *
     * @param incomeCategory the incomeCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new incomeCategory, or with status 400 (Bad Request) if the incomeCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/income-categories")
    public ResponseEntity<IncomeCategory> createIncomeCategory(@RequestBody IncomeCategory incomeCategory) throws URISyntaxException {
        log.debug("REST request to save IncomeCategory : {}", incomeCategory);
        if (incomeCategory.getId() != null) {
            throw new BadRequestAlertException("A new incomeCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IncomeCategory result = incomeCategoryRepository.save(incomeCategory);
        return ResponseEntity.created(new URI("/api/income-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /income-categories : Updates an existing incomeCategory.
     *
     * @param incomeCategory the incomeCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated incomeCategory,
     * or with status 400 (Bad Request) if the incomeCategory is not valid,
     * or with status 500 (Internal Server Error) if the incomeCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/income-categories")
    public ResponseEntity<IncomeCategory> updateIncomeCategory(@RequestBody IncomeCategory incomeCategory) throws URISyntaxException {
        log.debug("REST request to update IncomeCategory : {}", incomeCategory);
        if (incomeCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IncomeCategory result = incomeCategoryRepository.save(incomeCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, incomeCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /income-categories : get all the incomeCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of incomeCategories in body
     */
    @GetMapping("/income-categories")
    public List<IncomeCategory> getAllIncomeCategories() {
        log.debug("REST request to get all IncomeCategories");
        return incomeCategoryRepository.findAll();
    }

    /**
     * GET  /income-categories/:id : get the "id" incomeCategory.
     *
     * @param id the id of the incomeCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the incomeCategory, or with status 404 (Not Found)
     */
    @GetMapping("/income-categories/{id}")
    public ResponseEntity<IncomeCategory> getIncomeCategory(@PathVariable Long id) {
        log.debug("REST request to get IncomeCategory : {}", id);
        Optional<IncomeCategory> incomeCategory = incomeCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(incomeCategory);
    }

    /**
     * DELETE  /income-categories/:id : delete the "id" incomeCategory.
     *
     * @param id the id of the incomeCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/income-categories/{id}")
    public ResponseEntity<Void> deleteIncomeCategory(@PathVariable Long id) {
        log.debug("REST request to delete IncomeCategory : {}", id);
        incomeCategoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
