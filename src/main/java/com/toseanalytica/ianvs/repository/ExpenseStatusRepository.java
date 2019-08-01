package com.toseanalytica.ianvs.repository;

import com.toseanalytica.ianvs.domain.ExpenseStatus;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExpenseStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpenseStatusRepository extends JpaRepository<ExpenseStatus, Long> {

}
