package com.prescription.prescription_backend.service;

import com.prescription.prescription_backend.model.History;
import com.prescription.prescription_backend.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository repository;

    //-----------------------------SHOW-----------------------------

    public List<History> getAll_within_dateRange(LocalDate start, LocalDate end) {
        return repository.findByPrescriptionDateBetweenOrderByPrescriptionDateAsc(start, end);
    }


    public List<History> showAll(){
        return repository.findAll();
    }

    public Optional<History> getById(Integer id) {
        return repository.findById(id);
    }

    public List<History> getByName(String name) {
        return repository.findByPatientName(name);
    }

    public List<History> getByGender(String gender) {
        return repository.findByPatientGender(gender);
    }


    //-----------------------------CREATE & UPDATE-----------------------------

    public History create(History history) {
        return repository.save(history);
    }

    public History update(History history) {
        return repository.save(history);
    }
}
