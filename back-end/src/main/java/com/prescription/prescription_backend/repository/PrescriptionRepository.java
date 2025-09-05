package com.prescription.prescription_backend.repository;

import com.prescription.prescription_backend.dto.DayWiseCount;
import com.prescription.prescription_backend.model.Prescription;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {

    // Show prescriptions between start and end date
    List<Prescription> findByPrescriptionDateBetweenOrderByPrescriptionDateAsc(LocalDate start, LocalDate end);

    List<Prescription> findByPatientName(String patientName);
    List<Prescription> findByPatientGender(String patientGender);

    // Delete prescriptions between start and end date
    @Modifying
    @Transactional
    @Query("DELETE FROM Prescription p WHERE p.prescriptionDate >= :start AND p.prescriptionDate <= :end")
    void deleteByPrescriptionDateBetween(@Param("start") LocalDate start, @Param("end") LocalDate end);

    @Query("""
       SELECT new com.prescription.prescription_backend.dto.DayWiseCount(p.prescriptionDate, COUNT(p))
       FROM Prescription p
       WHERE p.prescriptionDate >= :start AND p.prescriptionDate <= :end
       GROUP BY p.prescriptionDate
       ORDER BY p.prescriptionDate
       """)
    List<DayWiseCount> countDayWise(@Param("start") LocalDate start, @Param("end") LocalDate end);

}
