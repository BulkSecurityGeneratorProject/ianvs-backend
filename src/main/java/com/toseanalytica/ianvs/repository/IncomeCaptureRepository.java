package com.toseanalytica.ianvs.repository;

import com.toseanalytica.ianvs.domain.IncomeCapture;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IncomeCapture entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IncomeCaptureRepository extends JpaRepository<IncomeCapture, Long> {

}
