package com.toseanalytica.ianvs.web.rest;
import com.toseanalytica.ianvs.domain.CompanyCategory;
import com.toseanalytica.ianvs.repository.CompanyCategoryRepository;
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
 * REST controller for managing CompanyCategory.
 */
@RestController
@RequestMapping("/api")
public class CompanyCategoryResource {

    private final Logger log = LoggerFactory.getLogger(CompanyCategoryResource.class);

    private static final String ENTITY_NAME = "companyCategory";

    private final CompanyCategoryRepository companyCategoryRepository;

    public CompanyCategoryResource(CompanyCategoryRepository companyCategoryRepository) {
        this.companyCategoryRepository = companyCategoryRepository;
    }

    /**
     * POST  /company-categories : Create a new companyCategory.
     *
     * @param companyCategory the companyCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new companyCategory, or with status 400 (Bad Request) if the companyCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/company-categories")
    public ResponseEntity<CompanyCategory> createCompanyCategory(@RequestBody CompanyCategory companyCategory) throws URISyntaxException {
        log.debug("REST request to save CompanyCategory : {}", companyCategory);
        if (companyCategory.getId() != null) {
            throw new BadRequestAlertException("A new companyCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompanyCategory result = companyCategoryRepository.save(companyCategory);
        return ResponseEntity.created(new URI("/api/company-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /company-categories : Updates an existing companyCategory.
     *
     * @param companyCategory the companyCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated companyCategory,
     * or with status 400 (Bad Request) if the companyCategory is not valid,
     * or with status 500 (Internal Server Error) if the companyCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/company-categories")
    public ResponseEntity<CompanyCategory> updateCompanyCategory(@RequestBody CompanyCategory companyCategory) throws URISyntaxException {
        log.debug("REST request to update CompanyCategory : {}", companyCategory);
        if (companyCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CompanyCategory result = companyCategoryRepository.save(companyCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, companyCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /company-categories : get all the companyCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of companyCategories in body
     */
    @GetMapping("/company-categories")
    public List<CompanyCategory> getAllCompanyCategories() {
        log.debug("REST request to get all CompanyCategories");
        return companyCategoryRepository.findAll();
    }

    /**
     * GET  /company-categories/:id : get the "id" companyCategory.
     *
     * @param id the id of the companyCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the companyCategory, or with status 404 (Not Found)
     */
    @GetMapping("/company-categories/{id}")
    public ResponseEntity<CompanyCategory> getCompanyCategory(@PathVariable Long id) {
        log.debug("REST request to get CompanyCategory : {}", id);
        Optional<CompanyCategory> companyCategory = companyCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(companyCategory);
    }

    /**
     * DELETE  /company-categories/:id : delete the "id" companyCategory.
     *
     * @param id the id of the companyCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/company-categories/{id}")
    public ResponseEntity<Void> deleteCompanyCategory(@PathVariable Long id) {
        log.debug("REST request to delete CompanyCategory : {}", id);
        companyCategoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
