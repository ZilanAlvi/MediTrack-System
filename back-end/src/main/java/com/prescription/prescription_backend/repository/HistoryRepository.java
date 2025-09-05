package com.prescription.prescription_backend.repository;


import com.prescription.prescription_backend.model.History;
import com.prescription.prescription_backend.model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Integer> {

    // Show prescriptions between start and end date
    List<History> findByPrescriptionDateBetweenOrderByPrescriptionDateAsc(LocalDate start, LocalDate end);

    List<History> findByPatientName(String patientName);
    List<History> findByPatientGender(String patientGender);
}




