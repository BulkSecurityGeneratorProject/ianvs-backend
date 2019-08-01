package com.toseanalytica.ianvs.web.rest;
import com.toseanalytica.ianvs.domain.Town;
import com.toseanalytica.ianvs.repository.TownRepository;
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
 * REST controller for managing Town.
 */
@RestController
@RequestMapping("/api")
public class TownResource {

    private final Logger log = LoggerFactory.getLogger(TownResource.class);

    private static final String ENTITY_NAME = "town";

    private final TownRepository townRepository;

    public TownResource(TownRepository townRepository) {
        this.townRepository = townRepository;
    }

    /**
     * POST  /towns : Create a new town.
     *
     * @param town the town to create
     * @return the ResponseEntity with status 201 (Created) and with body the new town, or with status 400 (Bad Request) if the town has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/towns")
    public ResponseEntity<Town> createTown(@RequestBody Town town) throws URISyntaxException {
        log.debug("REST request to save Town : {}", town);
        if (town.getId() != null) {
            throw new BadRequestAlertException("A new town cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Town result = townRepository.save(town);
        return ResponseEntity.created(new URI("/api/towns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /towns : Updates an existing town.
     *
     * @param town the town to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated town,
     * or with status 400 (Bad Request) if the town is not valid,
     * or with status 500 (Internal Server Error) if the town couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/towns")
    public ResponseEntity<Town> updateTown(@RequestBody Town town) throws URISyntaxException {
        log.debug("REST request to update Town : {}", town);
        if (town.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Town result = townRepository.save(town);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, town.getId().toString()))
            .body(result);
    }

    /**
     * GET  /towns : get all the towns.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of towns in body
     */
    @GetMapping("/towns")
    public List<Town> getAllTowns() {
        log.debug("REST request to get all Towns");
        return townRepository.findAll();
    }

    /**
     * GET  /towns/:id : get the "id" town.
     *
     * @param id the id of the town to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the town, or with status 404 (Not Found)
     */
    @GetMapping("/towns/{id}")
    public ResponseEntity<Town> getTown(@PathVariable Long id) {
        log.debug("REST request to get Town : {}", id);
        Optional<Town> town = townRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(town);
    }

    /**
     * DELETE  /towns/:id : delete the "id" town.
     *
     * @param id the id of the town to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/towns/{id}")
    public ResponseEntity<Void> deleteTown(@PathVariable Long id) {
        log.debug("REST request to delete Town : {}", id);
        townRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
