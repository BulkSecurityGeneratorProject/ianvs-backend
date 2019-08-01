package com.toseanalytica.ianvs.repository;

import com.toseanalytica.ianvs.domain.IncomeCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IncomeCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IncomeCategoryRepository extends JpaRepository<IncomeCategory, Long> {

}
