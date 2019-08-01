package com.toseanalytica.ianvs.repository;

import com.toseanalytica.ianvs.domain.Town;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Town entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TownRepository extends JpaRepository<Town, Long> {

}
