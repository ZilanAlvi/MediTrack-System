package com.prescription.prescription_backend.dto;

import java.time.LocalDate;

public record DayWiseCount(LocalDate prescriptionDate, Long count) {}
