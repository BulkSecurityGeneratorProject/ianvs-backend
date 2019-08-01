package com.toseanalytica.ianvs.repository;

import com.toseanalytica.ianvs.domain.CompanyCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CompanyCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyCategoryRepository extends JpaRepository<CompanyCategory, Long> {

}
