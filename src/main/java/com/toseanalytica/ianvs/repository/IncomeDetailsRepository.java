package com.toseanalytica.ianvs.repository;

import com.toseanalytica.ianvs.domain.IncomeDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IncomeDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IncomeDetailsRepository extends JpaRepository<IncomeDetails, Long> {

}
