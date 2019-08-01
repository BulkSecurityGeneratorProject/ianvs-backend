package com.toseanalytica.ianvs.repository;

import com.toseanalytica.ianvs.domain.CompanyStatus;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CompanyStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyStatusRepository extends JpaRepository<CompanyStatus, Long> {

}
