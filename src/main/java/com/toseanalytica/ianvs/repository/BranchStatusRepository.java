package com.toseanalytica.ianvs.repository;

import com.toseanalytica.ianvs.domain.BranchStatus;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BranchStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BranchStatusRepository extends JpaRepository<BranchStatus, Long> {

}
