package com.prescription.prescription_backend.service;

import com.prescription.prescription_backend.dto.DayWiseCount;
import com.prescription.prescription_backend.model.Prescription;
import com.prescription.prescription_backend.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository repository;


    //-----------------------------SHOW-----------------------------

    public List<Prescription> getAll_within_dateRange(LocalDate start, LocalDate end) {
        return repository.findByPrescriptionDateBetweenOrderByPrescriptionDateAsc(start, end);
    }

    public List<DayWiseCount> getDayWiseCounts(LocalDate start, LocalDate end) {
        return repository.countDayWise(start, end);
    }

    public List<Prescription> showAll(){
        return repository.findAll();
    }

    public Optional<Prescription> getById(Integer id) {
        return repository.findById(id);
    }

    public List<Prescription> getByName(String name) {
        return repository.findByPatientName(name);
    }

    public List<Prescription> getByGender(String gender) {
        return repository.findByPatientGender(gender);
    }


    //-----------------------------CREATE & UPDATE-----------------------------

    public Prescription create(Prescription prescription) {
        return repository.save(prescription);
    }

    public Prescription update(Prescription prescription) {
        return repository.save(prescription);
    }


    //-----------------------------DELETE-----------------------------
    public void delete_within_dateRange(LocalDate start, LocalDate end){
        repository.deleteByPrescriptionDateBetween(start, end);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }


}

