package com.toseanalytica.ianvs.repository;

import com.toseanalytica.ianvs.domain.IncomePayments;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IncomePayments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IncomePaymentsRepository extends JpaRepository<IncomePayments, Long> {

}
