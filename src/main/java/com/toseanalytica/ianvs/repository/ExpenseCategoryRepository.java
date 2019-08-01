package com.toseanalytica.ianvs.repository;

import com.toseanalytica.ianvs.domain.ExpenseCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExpenseCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> {

}
