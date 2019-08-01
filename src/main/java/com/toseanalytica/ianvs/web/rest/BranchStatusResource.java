package com.toseanalytica.ianvs.web.rest;
import com.toseanalytica.ianvs.domain.BranchStatus;
import com.toseanalytica.ianvs.repository.BranchStatusRepository;
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
 * REST controller for managing BranchStatus.
 */
@RestController
@RequestMapping("/api")
public class BranchStatusResource {

    private final Logger log = LoggerFactory.getLogger(BranchStatusResource.class);

    private static final String ENTITY_NAME = "branchStatus";

    private final BranchStatusRepository branchStatusRepository;

    public BranchStatusResource(BranchStatusRepository branchStatusRepository) {
        this.branchStatusRepository = branchStatusRepository;
    }

    /**
     * POST  /branch-statuses : Create a new branchStatus.
     *
     * @param branchStatus the branchStatus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new branchStatus, or with status 400 (Bad Request) if the branchStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/branch-statuses")
    public ResponseEntity<BranchStatus> createBranchStatus(@RequestBody BranchStatus branchStatus) throws URISyntaxException {
        log.debug("REST request to save BranchStatus : {}", branchStatus);
        if (branchStatus.getId() != null) {
            throw new BadRequestAlertException("A new branchStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BranchStatus result = branchStatusRepository.save(branchStatus);
        return ResponseEntity.created(new URI("/api/branch-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /branch-statuses : Updates an existing branchStatus.
     *
     * @param branchStatus the branchStatus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated branchStatus,
     * or with status 400 (Bad Request) if the branchStatus is not valid,
     * or with status 500 (Internal Server Error) if the branchStatus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/branch-statuses")
    public ResponseEntity<BranchStatus> updateBranchStatus(@RequestBody BranchStatus branchStatus) throws URISyntaxException {
        log.debug("REST request to update BranchStatus : {}", branchStatus);
        if (branchStatus.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BranchStatus result = branchStatusRepository.save(branchStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, branchStatus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /branch-statuses : get all the branchStatuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of branchStatuses in body
     */
    @GetMapping("/branch-statuses")
    public List<BranchStatus> getAllBranchStatuses() {
        log.debug("REST request to get all BranchStatuses");
        return branchStatusRepository.findAll();
    }

    /**
     * GET  /branch-statuses/:id : get the "id" branchStatus.
     *
     * @param id the id of the branchStatus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the branchStatus, or with status 404 (Not Found)
     */
    @GetMapping("/branch-statuses/{id}")
    public ResponseEntity<BranchStatus> getBranchStatus(@PathVariable Long id) {
        log.debug("REST request to get BranchStatus : {}", id);
        Optional<BranchStatus> branchStatus = branchStatusRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(branchStatus);
    }

    /**
     * DELETE  /branch-statuses/:id : delete the "id" branchStatus.
     *
     * @param id the id of the branchStatus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/branch-statuses/{id}")
    public ResponseEntity<Void> deleteBranchStatus(@PathVariable Long id) {
        log.debug("REST request to delete BranchStatus : {}", id);
        branchStatusRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
