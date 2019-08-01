package com.toseanalytica.ianvs.web.rest;
import com.toseanalytica.ianvs.domain.IncomeCapture;
import com.toseanalytica.ianvs.repository.IncomeCaptureRepository;
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
 * REST controller for managing IncomeCapture.
 */
@RestController
@RequestMapping("/api")
public class IncomeCaptureResource {

    private final Logger log = LoggerFactory.getLogger(IncomeCaptureResource.class);

    private static final String ENTITY_NAME = "incomeCapture";

    private final IncomeCaptureRepository incomeCaptureRepository;

    public IncomeCaptureResource(IncomeCaptureRepository incomeCaptureRepository) {
        this.incomeCaptureRepository = incomeCaptureRepository;
    }

    /**
     * POST  /income-captures : Create a new incomeCapture.
     *
     * @param incomeCapture the incomeCapture to create
     * @return the ResponseEntity with status 201 (Created) and with body the new incomeCapture, or with status 400 (Bad Request) if the incomeCapture has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/income-captures")
    public ResponseEntity<IncomeCapture> createIncomeCapture(@RequestBody IncomeCapture incomeCapture) throws URISyntaxException {
        log.debug("REST request to save IncomeCapture : {}", incomeCapture);
        if (incomeCapture.getId() != null) {
            throw new BadRequestAlertException("A new incomeCapture cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IncomeCapture result = incomeCaptureRepository.save(incomeCapture);
        return ResponseEntity.created(new URI("/api/income-captures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /income-captures : Updates an existing incomeCapture.
     *
     * @param incomeCapture the incomeCapture to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated incomeCapture,
     * or with status 400 (Bad Request) if the incomeCapture is not valid,
     * or with status 500 (Internal Server Error) if the incomeCapture couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/income-captures")
    public ResponseEntity<IncomeCapture> updateIncomeCapture(@RequestBody IncomeCapture incomeCapture) throws URISyntaxException {
        log.debug("REST request to update IncomeCapture : {}", incomeCapture);
        if (incomeCapture.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IncomeCapture result = incomeCaptureRepository.save(incomeCapture);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, incomeCapture.getId().toString()))
            .body(result);
    }

    /**
     * GET  /income-captures : get all the incomeCaptures.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of incomeCaptures in body
     */
    @GetMapping("/income-captures")
    public List<IncomeCapture> getAllIncomeCaptures() {
        log.debug("REST request to get all IncomeCaptures");
        return incomeCaptureRepository.findAll();
    }

    /**
     * GET  /income-captures/:id : get the "id" incomeCapture.
     *
     * @param id the id of the incomeCapture to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the incomeCapture, or with status 404 (Not Found)
     */
    @GetMapping("/income-captures/{id}")
    public ResponseEntity<IncomeCapture> getIncomeCapture(@PathVariable Long id) {
        log.debug("REST request to get IncomeCapture : {}", id);
        Optional<IncomeCapture> incomeCapture = incomeCaptureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(incomeCapture);
    }

    /**
     * DELETE  /income-captures/:id : delete the "id" incomeCapture.
     *
     * @param id the id of the incomeCapture to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/income-captures/{id}")
    public ResponseEntity<Void> deleteIncomeCapture(@PathVariable Long id) {
        log.debug("REST request to delete IncomeCapture : {}", id);
        incomeCaptureRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
