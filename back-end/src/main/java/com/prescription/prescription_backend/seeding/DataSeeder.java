package com.prescription.prescription_backend.seeding;

import com.prescription.prescription_backend.model.Prescription;
import com.prescription.prescription_backend.repository.PrescriptionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final PrescriptionRepository repository;

    public DataSeeder(PrescriptionRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        repository.saveAll(List.of(
                new Prescription(null, LocalDate.of(2025,5,2), "Alice Rahman",28,"Female","Fever","Paracetamol 500mg",LocalDate.of(2025,5,9)),
                new Prescription(null, LocalDate.of(2025,5,5), "Hasan Karim",40,"Male","High Blood Pressure","Amlodipine 5mg",LocalDate.of(2025,5,20)),
                new Prescription(null, LocalDate.of(2025,5,10), "Sara Ahmed",35,"Female","Diabetes","Metformin 500mg",LocalDate.of(2025,5,24)),
                new Prescription(null, LocalDate.of(2025,5,15), "Rafiq Hossain",50,"Male","Arthritis","Ibuprofen 400mg",LocalDate.of(2025,5,30)),
                new Prescription(null, LocalDate.of(2025,5,18), "Maya Akter",22,"Female","Cold","Cetirizine 10mg",LocalDate.of(2025,5,25)),
                new Prescription(null, LocalDate.of(2025,5,21), "Shahidul Islam",60,"Male","Back Pain","Diclofenac 50mg",LocalDate.of(2025,6,5)),
                new Prescription(null, LocalDate.of(2025,5,25), "Fatema Begum",30,"Female","Migraine","Sumatriptan 50mg",LocalDate.of(2025,6,2)),
                new Prescription(null, LocalDate.of(2025,5,28), "Imran Khan",45,"Male","Hypertension","Losartan 50mg",LocalDate.of(2025,6,10)),
                new Prescription(null, LocalDate.of(2025,6,1), "Nadia Parveen",27,"Female","Asthma","Salbutamol Inhaler",LocalDate.of(2025,6,15)),
                new Prescription(null, LocalDate.of(2025,6,3), "Tanvir Hossain",38,"Male","Allergy","Loratadine 10mg",LocalDate.of(2025,6,20)),
                new Prescription(null, LocalDate.of(2025,6,6), "Rina Sultana",33,"Female","Anemia","Iron Supplement",LocalDate.of(2025,6,21)),
                new Prescription(null, LocalDate.of(2025,6,9), "Mahmudul Hasan",52,"Male","Diabetes","Insulin 10IU",LocalDate.of(2025,6,30)),
                new Prescription(null, LocalDate.of(2025,6,12), "Farhana Akter",41,"Female","Thyroid","Levothyroxine 50mcg",LocalDate.of(2025,7,1)),
                new Prescription(null, LocalDate.of(2025,6,15), "Jamal Uddin",29,"Male","Fever","Paracetamol 500mg",LocalDate.of(2025,6,22)),
                new Prescription(null, LocalDate.of(2025,6,18), "Sabrina Nahar",37,"Female","Cold","Diphenhydramine 25mg",LocalDate.of(2025,6,25)),
                new Prescription(null, LocalDate.of(2025,6,21), "Arif Chowdhury",48,"Male","Back Pain","Naproxen 250mg",LocalDate.of(2025,7,5)),
                new Prescription(null, LocalDate.of(2025,7,1), "Laila Karim",26,"Female","Migraine","Rizatriptan 10mg",LocalDate.of(2025,7,8)),
                new Prescription(null, LocalDate.of(2025,7,4), "Rashed Ahmed",34,"Male","Hypertension","Amlodipine 5mg",LocalDate.of(2025,7,20)),
                new Prescription(null, LocalDate.of(2025,7,7), "Nusrat Jahan",39,"Female","Diabetes","Metformin 500mg",LocalDate.of(2025,7,21)),
                new Prescription(null, LocalDate.of(2025,7,10), "Sabbir Hossain",55,"Male","Arthritis","Ibuprofen 400mg",LocalDate.of(2025,7,25)),
                new Prescription(null, LocalDate.of(2025,7,14), "Tania Akter",31,"Female","Asthma","Salbutamol Inhaler",LocalDate.of(2025,7,28)),
                new Prescription(null, LocalDate.of(2025,7,18), "Fahim Rahman",42,"Male","Cold","Cetirizine 10mg",LocalDate.of(2025,7,26)),
                new Prescription(null, LocalDate.of(2025,7,22), "Mousumi Sultana",36,"Female","Anemia","Iron Supplement",LocalDate.of(2025,8,1)),
                new Prescription(null, LocalDate.of(2025,7,25), "Rezaul Karim",50,"Male","Fever","Paracetamol 500mg",LocalDate.of(2025,8,5)),
                new Prescription(null, LocalDate.of(2025,8,1), "Samira Akter",28,"Female","Migraine","Sumatriptan 50mg",LocalDate.of(2025,8,10)),
                new Prescription(null, LocalDate.of(2025,8,5), "Nazmul Hossain",44,"Male","Hypertension","Losartan 50mg",LocalDate.of(2025,8,15))
        ));
    }
}
