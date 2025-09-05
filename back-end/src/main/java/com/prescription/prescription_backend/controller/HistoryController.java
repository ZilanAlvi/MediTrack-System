package com.prescription.prescription_backend.controller;

import com.prescription.prescription_backend.model.History;
import com.prescription.prescription_backend.service.HistoryService;
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
@RequestMapping("/api/v1/history")
@CrossOrigin(origins = "http://localhost:5173") // allow React dev server
public class HistoryController {

    @Autowired
    private HistoryService service;

    //-----------------------------GET-----------------------------

    @GetMapping
    public ResponseEntity<List<History>> getAll() {
        return ResponseEntity.ok(service.showAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
        Optional<History> history = service.getById(id);
        return history
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Prescription with ID " + id + " not found"));
    }

    @GetMapping("/by-name")
    public ResponseEntity<List<History>> getByName(@RequestParam("name") String name) {
        return ResponseEntity.ok(service.getByName(name));
    }

    @GetMapping("/by-gender")
    public ResponseEntity<List<History>> getByGender(@RequestParam("gender") String gender) {
        return ResponseEntity.ok(service.getByGender(gender));
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<History>> getByDateRange(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(service.getAll_within_dateRange(start, end));
    }

    //-----------------------------CREATE-----------------------------

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody History history) {
        History saved = service.create(history);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    //-----------------------------UPDATE-----------------------------

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable("id") Integer id,
            @Valid @RequestBody History history) {
        history.setId(id);
        History updated = service.update(history);
        return ResponseEntity.ok(updated);
    }
}
