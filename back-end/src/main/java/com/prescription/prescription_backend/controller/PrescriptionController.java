package com.prescription.prescription_backend.controller;

import com.prescription.prescription_backend.dto.DayWiseCount;
import com.prescription.prescription_backend.model.Prescription;
import com.prescription.prescription_backend.service.PrescriptionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/prescription")
@CrossOrigin(origins = "http://localhost:5173") // allow React dev server
public class PrescriptionController {

    @Autowired
    private PrescriptionService service;

    //-----------------------------GET-----------------------------

    @GetMapping
    public ResponseEntity<List<Prescription>> getAll() {
        return ResponseEntity.ok(service.showAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
        Optional<Prescription> prescription = service.getById(id);
        return prescription
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Prescription with ID " + id + " not found"));
    }

    @GetMapping("/by-name")
    public ResponseEntity<List<Prescription>> getByName(@RequestParam("name") String name) {
        return ResponseEntity.ok(service.getByName(name));
    }

    @GetMapping("/by-gender")
    public ResponseEntity<List<Prescription>> getByGender(@RequestParam("gender") String gender) {
        return ResponseEntity.ok(service.getByGender(gender));
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<Prescription>> getByDateRange(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(service.getAll_within_dateRange(start, end));
    }

    @GetMapping("/daywise-report")
    public ResponseEntity<List<DayWiseCount>> getDayWiseReport(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(service.getDayWiseCounts(start, end));
    }

    //-----------------------------CREATE-----------------------------

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Prescription prescription) {
        Prescription saved = service.create(prescription);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    //-----------------------------UPDATE-----------------------------

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable("id") Integer id,
            @Valid @RequestBody Prescription prescription) {
        prescription.setId(id);
        Prescription updated = service.update(prescription);
        return ResponseEntity.ok(updated);
    }

    //-----------------------------DELETE-----------------------------

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        service.delete(id);
        return ResponseEntity.ok("Prescription with ID " + id + " deleted successfully");
    }

    @DeleteMapping("/by-date")
    public ResponseEntity<?> deleteByDateRange(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        service.delete_within_dateRange(start, end);
        return ResponseEntity.ok("Prescriptions between " + start + " and " + end + " deleted successfully");
    }
}
