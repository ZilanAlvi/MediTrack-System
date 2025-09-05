# MediTrack System – Backend

[![Java](https://img.shields.io/badge/Java-17-blue)](https://www.oracle.com/java/)  
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-green)](https://spring.io/projects/spring-boot)  
[![H2 Database](https://img.shields.io/badge/H2-Database-orange)](https://www.h2database.com/)  

A secure and scalable **Prescription Management System** backend built with **Spring Boot**, providing REST APIs for managing prescriptions, prescription history, and reporting.

---

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [System Architecture](#system-architecture)  
4. [Project Structure](#project-structure)  
5. [Dependencies](#dependencies)  
6. [API Endpoints](#api-endpoints)  
7. [Database Design](#database-design)  
8. [Setup & Run](#setup--run)  
9. [Future Enhancements](#future-enhancements)  
10. [License](#license)  

---

## 1. Overview

The backend provides a **RESTful API** for managing prescriptions. It supports authentication, prescription CRUD operations, day-wise reporting, and history tracking. Built with **Spring Boot 3.5.5**, **Spring Security**, and **Spring Data JPA**, using **H2** for development.

---

## 2. Features

### Authentication & Authorization
- Spring Security with **BCrypt** password hashing.
- Users and roles stored in H2 database.
- No anonymous access.

### Prescription Management (CRUD)
- Create, read, update, delete prescriptions.
- Mandatory fields: `date`, `name`, `age`, `gender`.
- Optional fields: `diagnosis`, `medicines`, `nextVisitDate`.

### Filtering & Reporting
- Filter prescriptions by **date range**, **name**, or **gender**.
- Day-wise prescription count reports.

### Extra Features
- Prescription history tracking.
- User seeder for admin account.
- Batch deletion by date range.
- CORS enabled for frontend integration (`http://localhost:5173`).

---

## 3. System Architecture

**Layered Architecture:**

1. **Controller Layer** – REST API endpoints  
2. **Service Layer** – Business logic  
3. **Repository Layer** – JPA database operations  
4. **Model Layer** – Entity classes  
5. **Security Layer** – Authentication & authorization  
6. **Exception Handling** – Centralized error responses  
7. **Database Layer** – H2 (development), configurable to MySQL/PostgreSQL  

---
src/main/java/com/prescription/prescription_backend/
│
├── config/ # Security & CORS configs
├── controller/ # REST controllers
├── dto/ # Data Transfer Objects
├── exception/ # Global exception handling
├── model/ # Entity classes
├── repository/ # JPA repositories
├── seeding/ # Data seeders
└── service/ # Business logic services


---

## 5. Dependencies

- Spring Boot Starter Web – REST APIs  
- Spring Boot Starter Data JPA – Hibernate ORM  
- Spring Boot Starter Security – Authentication & authorization  
- Spring Boot Starter Validation – Request validations  
- H2 Database – In-memory database  
- Lombok – Boilerplate reduction  
- Spring Boot Starter Test – JUnit & Mockito  

---

## 6. API Endpoints

### Authentication


### Prescription

GET /api/v1/prescription
GET /api/v1/prescription/{id}
GET /api/v1/prescription/by-name?name={name}
GET /api/v1/prescription/by-gender?gender={gender}
GET /api/v1/prescription/by-date?start={date}&end={date}
GET /api/v1/prescription/daywise-report?start={date}&end={date}
POST /api/v1/prescription
PUT /api/v1/prescription/{id}
DELETE /api/v1/prescription/{id}
DELETE /api/v1/prescription/by-date?start={date}&end={date}


### History
- Same endpoints as **Prescription**, but operates on **History** entity.

---

## 7. Database Design

| Table | Fields |
|-------|--------|
| User | id, username, password, roles |
| Prescription | id, date, patientName, age, gender, diagnosis, medicines, nextVisitDate |
| History | Same as Prescription (archival purposes) |

---

## 8. Setup & Run

### Prerequisites
- Java 17+
- Maven 3+
- Optional: MySQL/PostgreSQL for production  

### Steps
1. Clone the repository:
```bash
git clone https://github.com/yourusername/meditrack-backend.git
cd meditrack-backend


API is available at:
http://localhost:8080/api/v1/

9. Future Enhancements

Swagger/OpenAPI documentation

Email reminders for next visits

Role-based access control (admin/user)

Production database support (MySQL/PostgreSQL)

Enhanced analytics and reporting

Audit logging for CRUD operations


## 4. Project Structure

