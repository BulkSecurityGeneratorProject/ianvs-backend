package com.toseanalytica.ianvs.web.rest;
import com.toseanalytica.ianvs.domain.CompanyStatus;
import com.toseanalytica.ianvs.repository.CompanyStatusRepository;
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
 * REST controller for managing CompanyStatus.
 */
@RestController
@RequestMapping("/api")
public class CompanyStatusResource {

    private final Logger log = LoggerFactory.getLogger(CompanyStatusResource.class);

    private static final String ENTITY_NAME = "companyStatus";

    private final CompanyStatusRepository companyStatusRepository;

    public CompanyStatusResource(CompanyStatusRepository companyStatusRepository) {
        this.companyStatusRepository = companyStatusRepository;
    }

    /**
     * POST  /company-statuses : Create a new companyStatus.
     *
     * @param companyStatus the companyStatus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new companyStatus, or with status 400 (Bad Request) if the companyStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/company-statuses")
    public ResponseEntity<CompanyStatus> createCompanyStatus(@RequestBody CompanyStatus companyStatus) throws URISyntaxException {
        log.debug("REST request to save CompanyStatus : {}", companyStatus);
        if (companyStatus.getId() != null) {
            throw new BadRequestAlertException("A new companyStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompanyStatus result = companyStatusRepository.save(companyStatus);
        return ResponseEntity.created(new URI("/api/company-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /company-statuses : Updates an existing companyStatus.
     *
     * @param companyStatus the companyStatus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated companyStatus,
     * or with status 400 (Bad Request) if the companyStatus is not valid,
     * or with status 500 (Internal Server Error) if the companyStatus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/company-statuses")
    public ResponseEntity<CompanyStatus> updateCompanyStatus(@RequestBody CompanyStatus companyStatus) throws URISyntaxException {
        log.debug("REST request to update CompanyStatus : {}", companyStatus);
        if (companyStatus.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CompanyStatus result = companyStatusRepository.save(companyStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, companyStatus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /company-statuses : get all the companyStatuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of companyStatuses in body
     */
    @GetMapping("/company-statuses")
    public List<CompanyStatus> getAllCompanyStatuses() {
        log.debug("REST request to get all CompanyStatuses");
        return companyStatusRepository.findAll();
    }

    /**
     * GET  /company-statuses/:id : get the "id" companyStatus.
     *
     * @param id the id of the companyStatus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the companyStatus, or with status 404 (Not Found)
     */
    @GetMapping("/company-statuses/{id}")
    public ResponseEntity<CompanyStatus> getCompanyStatus(@PathVariable Long id) {
        log.debug("REST request to get CompanyStatus : {}", id);
        Optional<CompanyStatus> companyStatus = companyStatusRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(companyStatus);
    }

    /**
     * DELETE  /company-statuses/:id : delete the "id" companyStatus.
     *
     * @param id the id of the companyStatus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/company-statuses/{id}")
    public ResponseEntity<Void> deleteCompanyStatus(@PathVariable Long id) {
        log.debug("REST request to delete CompanyStatus : {}", id);
        companyStatusRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
