package com.toseanalytica.ianvs.web.rest;
import com.toseanalytica.ianvs.domain.IncomeDetails;
import com.toseanalytica.ianvs.repository.IncomeDetailsRepository;
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
 * REST controller for managing IncomeDetails.
 */
@RestController
@RequestMapping("/api")
public class IncomeDetailsResource {

    private final Logger log = LoggerFactory.getLogger(IncomeDetailsResource.class);

    private static final String ENTITY_NAME = "incomeDetails";

    private final IncomeDetailsRepository incomeDetailsRepository;

    public IncomeDetailsResource(IncomeDetailsRepository incomeDetailsRepository) {
        this.incomeDetailsRepository = incomeDetailsRepository;
    }

    /**
     * POST  /income-details : Create a new incomeDetails.
     *
     * @param incomeDetails the incomeDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new incomeDetails, or with status 400 (Bad Request) if the incomeDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/income-details")
    public ResponseEntity<IncomeDetails> createIncomeDetails(@RequestBody IncomeDetails incomeDetails) throws URISyntaxException {
        log.debug("REST request to save IncomeDetails : {}", incomeDetails);
        if (incomeDetails.getId() != null) {
            throw new BadRequestAlertException("A new incomeDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IncomeDetails result = incomeDetailsRepository.save(incomeDetails);
        return ResponseEntity.created(new URI("/api/income-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /income-details : Updates an existing incomeDetails.
     *
     * @param incomeDetails the incomeDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated incomeDetails,
     * or with status 400 (Bad Request) if the incomeDetails is not valid,
     * or with status 500 (Internal Server Error) if the incomeDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/income-details")
    public ResponseEntity<IncomeDetails> updateIncomeDetails(@RequestBody IncomeDetails incomeDetails) throws URISyntaxException {
        log.debug("REST request to update IncomeDetails : {}", incomeDetails);
        if (incomeDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IncomeDetails result = incomeDetailsRepository.save(incomeDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, incomeDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /income-details : get all the incomeDetails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of incomeDetails in body
     */
    @GetMapping("/income-details")
    public List<IncomeDetails> getAllIncomeDetails() {
        log.debug("REST request to get all IncomeDetails");
        return incomeDetailsRepository.findAll();
    }

    /**
     * GET  /income-details/:id : get the "id" incomeDetails.
     *
     * @param id the id of the incomeDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the incomeDetails, or with status 404 (Not Found)
     */
    @GetMapping("/income-details/{id}")
    public ResponseEntity<IncomeDetails> getIncomeDetails(@PathVariable Long id) {
        log.debug("REST request to get IncomeDetails : {}", id);
        Optional<IncomeDetails> incomeDetails = incomeDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(incomeDetails);
    }

    /**
     * DELETE  /income-details/:id : delete the "id" incomeDetails.
     *
     * @param id the id of the incomeDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/income-details/{id}")
    public ResponseEntity<Void> deleteIncomeDetails(@PathVariable Long id) {
        log.debug("REST request to delete IncomeDetails : {}", id);
        incomeDetailsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
