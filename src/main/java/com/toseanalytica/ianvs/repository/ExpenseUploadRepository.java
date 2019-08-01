package com.toseanalytica.ianvs.repository;

import com.toseanalytica.ianvs.domain.ExpenseUpload;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExpenseUpload entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpenseUploadRepository extends JpaRepository<ExpenseUpload, Long> {

}
