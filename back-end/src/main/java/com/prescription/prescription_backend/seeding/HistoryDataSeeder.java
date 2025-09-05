package com.prescription.prescription_backend.seeding;

import com.prescription.prescription_backend.model.History;
import com.prescription.prescription_backend.repository.HistoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;

@Component

public class HistoryDataSeeder implements CommandLineRunner {

    private final HistoryRepository repository;

    public HistoryDataSeeder(HistoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        repository.saveAll(List.of(
                new History(100, LocalDate.of(2025,7,10), "Sabbir Hossain",55,"Male","Arthritis","Ibuprofen 400mg",LocalDate.of(2025,7,25)),
                new History(220, LocalDate.of(2025,7,14), "Tania Akter",31,"Female","Asthma","Salbutamol Inhaler",LocalDate.of(2025,7,28)),
                new History(300, LocalDate.of(2025,7,18), "Fahim Rahman",42,"Male","Cold","Cetirizine 10mg",LocalDate.of(2025,7,26)),
                new History(600, LocalDate.of(2025,7,22), "Mousumi Sultana",36,"Female","Anemia","Iron Supplement",LocalDate.of(2025,8,1)),
                new History(123, LocalDate.of(2025,7,25), "Rezaul Karim",50,"Male","Fever","Paracetamol 500mg",LocalDate.of(2025,8,5)),
                new History(758, LocalDate.of(2025,8,1), "Samira Akter",28,"Female","Migraine","Sumatriptan 50mg",LocalDate.of(2025,8,10)),
                new History(110, LocalDate.of(2025,8,5), "Nazmul Hossain",44,"Male","Hypertension","Losartan 50mg",LocalDate.of(2025,8,15))
        ));
    }
}
