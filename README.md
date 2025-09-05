# MediTrack System – Backend

[![Java](https://img.shields.io/badge/Java-17-blue)](https://www.oracle.com/java/)  
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-green)](https://spring.io/projects/spring-boot)  
[![H2 Database](https://img.shields.io/badge/H2-Database-orange)](https://www.h2database.com/)  

A secure and scalable **Prescription Management System** backend built with **Spring Boot**, providing REST APIs for managing prescriptions, prescription history, and reporting.

---

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Extra Backend Features](#extra-backend-features)  
4. [System Architecture](#system-architecture)  
5. [Project Structure](#project-structure)  
6. [Dependencies](#dependencies)  
7. [API Endpoints](#api-endpoints)  
8. [Database Design](#database-design)  
9. [Setup & Run](#setup--run)  
10. [Future Enhancements](#future-enhancements)  
11. [Conclusion](#conclusion)  
12. [License](#license)  

---

## 1. Overview

The **Prescription Management System** backend is a **Spring Boot** application providing a secure REST API for managing prescriptions. It supports:

- Authentication & Authorization  
- Full prescription CRUD operations  
- Prescription history tracking  
- Day-wise reporting  

Built with **Spring Boot 3.5.5**, **Spring Security**, **Spring Data JPA**, and **H2** for development. The backend uses a **layered architecture** to ensure maintainability and scalability.

---

## 2. Features

### Authentication & Authorization
- Implemented with **Spring Security**
- Users and roles stored in H2 database
- Passwords hashed using **BCrypt**
- No anonymous access

### Prescription Management (CRUD)
- Create, read, update, delete prescriptions
- Mandatory fields: `date`, `patientName`, `age` (validated range), `gender`
- Optional fields: `diagnosis`, `medicines`, `nextVisitDate`

### Prescription Filtering
- Filter by **date range** (default: current month)
- Filter by **name** or **gender**

### Day-wise Reporting
- Generates prescription counts per day using **custom JPA queries**

### Error Handling & Validation
- Spring Validation annotations: `@NotNull`, `@NotBlank`, `@Min`, `@Max`
- Global exception handler ensures consistent **JSON error responses**

### REST API
- All data exposed as **JSON endpoints** for frontend integration

---

## 3. Extra Backend Features
- **Prescription History** – Separate table and API for tracking history  
- **User Seeder** – Seeds an admin account at startup  
- **CORS Configuration** – Allows requests from `http://localhost:5173`  
- **Batch Deletion** – Delete prescriptions in bulk by date range  
- **Optimized Reporting** – Efficient day-wise counts using JPQL

---

## 4. System Architecture
Layered Architecture:

1. **Controller Layer** – REST API endpoints  
2. **Service Layer** – Business logic  
3. **Repository Layer** – Database operations via Spring Data JPA  
4. **Model Layer** – Entities representing tables  
5. **Security Layer** – Authentication, authorization, password hashing  
6. **Exception Handling** – Centralized error responses  
7. **Database Layer** – H2 in-memory database (configurable for MySQL/PostgreSQL)  

---

## 5. Project Structure
```bash

src/main/java/com/prescription/prescription_backend/
│
├── config/ # Security & CORS configurations
│ ├── GlobalCorsConfig.java
│ └── SecurityConfig.java
│
├── controller/ # REST controllers
│ ├── AuthController.java
│ ├── PrescriptionController.java
│ └── HistoryController.java
│
├── dto/ # Data Transfer Objects
│ └── DayWiseCount.java
│
├── exception/ # Exception handling
│ └── GlobalExceptionHandler.java
│
├── model/ # Entity classes
│ ├── User.java
│ ├── Prescription.java
│ └── History.java
│
├── repository/ # JPA Repositories
│ ├── UserRepository.java
│ ├── PrescriptionRepository.java
│ └── HistoryRepository.java
│
├── seeding/ # Data seeders
│ ├── UserSeeder.java
│ ├── DataSeeder.java
│ └── HistoryDataSeeder.java
│
└── service/ # Business services
├── PrescriptionService.java
└── HistoryService.java

```

---

## 6. Dependencies

- **Spring Boot Starter Web** – REST API support  
- **Spring Boot Starter Data JPA** – ORM and database operations  
- **Spring Boot Starter Security** – Authentication & authorization  
- **Spring Boot Starter Validation** – Request validation  
- **H2 Database** – In-memory database for development/testing  
- **Spring Boot Starter Test** – JUnit & Mockito  
- **Lombok** – Reduces boilerplate (`@Getter`, `@Setter`, `@Builder`)  
- **Thymeleaf + Spring Security Extras** (optional)  

---

## 7. API Endpoints

### Authentication

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
- Same endpoints as **Prescription**, but operates on **History** entity

---

## 8. Database Design

| Table        | Fields                                                                 |
|--------------|------------------------------------------------------------------------|
| User         | id, username, password, roles                                          |
| Prescription | id, date, patientName, age, gender, diagnosis, medicines, nextVisitDate |
| History      | Same as Prescription (archival purposes)                               |

---

## 9. Setup & Run

### Prerequisites
- Java 17+  
- Maven 3+  
- Optional: MySQL/PostgreSQL for production  



-------------------------------------------------------------------------------------


### MediTrack System – Frontend

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)  
[![Vite](https://img.shields.io/badge/Vite-5-brightgreen)](https://vitejs.dev/)  
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple)](https://getbootstrap.com/)  

The **MediTrack System frontend** is a modern, responsive React application built with **Vite**. It provides a professional interface for managing prescriptions, reporting, analytics, history, and PDF export, seamlessly connecting to the Spring Boot backend.

---

## Table of Contents

1. [Introduction](#introduction)  
2. [Technology Stack](#technology-stack)  
3. [Dependencies](#dependencies)  
4. [Project Structure](#project-structure)  
5. [Routing Map](#routing-map)  
6. [API Endpoints Consumed](#api-endpoints-consumed)  
7. [Functional Features](#functional-features)  
8. [Styling & UX Enhancements](#styling--ux-enhancements)  
9. [Edge Cases & Improvements](#edge-cases--improvements)  
10. [Running the Frontend](#running-the-frontend)  
11. [Conclusion](#conclusion)  

---

## 1. Introduction

The frontend of the **MediTrack System** is developed with **React (Vite)** and provides a secure, responsive, and user-friendly interface for managing prescriptions. It supports all CRUD operations, reporting, analytics, patient history, and PDF exports.  

- Fully responsive  
- Dark gradient theme  
- Optimized for smooth workflow  

---

## 2. Technology Stack

- **React (with Hooks)** – UI and state management  
- **Vite** – Fast dev server and build system  
- **React Router DOM** – Client-side routing and protected routes  
- **React-Bootstrap + Bootstrap** – Responsive grid, forms, modals, components  
- **Axios** – API requests with promises  
- **Recharts** – Line charts for day-wise reports  
- **Chart.js + react-chartjs-2** – Analytical charts  
- **jsPDF + jsPDF-autotable** – PDF report generation  
- **react-to-print** – Printing support  
- **dayjs** – Date manipulation  
- **MUI + React Icons** – Icons and additional UI components  

---

## 3. Dependencies

Install via npm:

```bash
npm install react react-dom vite
npm install react-router-dom
npm install bootstrap react-bootstrap
npm install axios
npm install recharts
npm install chart.js react-chartjs-2
npm install jspdf jspdf-autotable
npm install react-to-print
npm install dayjs
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install react-icons
```

## 4. Project Structure
```bash

src/
├── api/
│   └── prescriptionApi.js
├── components/
│   ├── Header.jsx
│   └── Footer.jsx
├── pages/
│   ├── Login.jsx
│   ├── PrescriptionList.jsx
│   ├── CreatePrescription.jsx
│   ├── EditPrescription.jsx
│   ├── DailyPrescriptionReport.jsx
│   ├── InsightsDashboard.jsx
│   ├── PatientHistory.jsx
│   ├── PdfView.jsx
│   └── PatientHistory.css
├── styles/
├── App.jsx
└── main.jsx
```
## 5. Routing Map
| Route                     | Page                                     |
| ------------------------- | ---------------------------------------- |
| `/login`                  | Login page                               |
| `/prescriptions`          | Prescription list (dashboard)            |
| `/prescriptions/new`      | Create prescription                      |
| `/prescriptions/:id/edit` | Edit prescription                        |
| `/reports/daywise`        | Daily prescription report                |
| `/insights`               | Analytics dashboard                      |
| `/history`                | Patient history (archived prescriptions) |
| `/pdf`                    | PDF export page                          |


## 6. API Endpoints Consumed
```bash

POST   /api/v1/auth/login
GET    /api/v1/prescription
GET    /api/v1/prescription/:id
POST   /api/v1/prescription
PUT    /api/v1/prescription/:id
DELETE /api/v1/prescription/:id
DELETE /api/v1/prescription/by-date?start&end
GET    /api/v1/prescription/by-date?start&end
GET    /api/v1/prescription/daywise-report?start&end
GET    /api/v1/history
POST   /api/v1/history
```


---

## 7. Functional Features

### Authentication & Session

* **Login**

  * Validates username/password via backend
  * Stores user in `localStorage`
  * Redirects to `/prescriptions`
* **Logout**

  * Clears session
  * Navigates to `/login`
* **Protected Routes**

  * Only accessible when logged in

### Prescription List (Dashboard)

* Fetches all prescriptions or filtered by date range
* **Search:** By patient name or diagnosis
* **Date Range Filter:** Auto-applied
* **Pagination:** Client-side, 10 rows per page
* **Sort:** By date (newest first)
* **Row Actions:**

  * **Edit:** Opens form to update prescription
  * **Delete:** Confirmation modal
  * **Archive:** Moves entry to History via `POST /history`
* **UX Enhancements:** Loading spinners, hover effects, confirmation dialogs, alerts

### Create Prescription

* **Form Validation:**

  * Mandatory: `date`, `name`, `age`, `gender`
  * Optional: `diagnosis`, `medicines`, `next visit date`
* **Client Feedback:** Inline errors using `isInvalid`
* **Submit:** `POST /prescription`
* **Success:** Shows alert and redirects to dashboard

### Edit Prescription

* Fetches prescription by ID and pre-fills form
* Validates inputs
* **Submit:** `PUT /prescription/:id`
* Spinner during load; shows alert on save

### Daily Prescription Report

* **Inputs:** Start & end date
* Fetches day-wise prescription counts
* Displays table + Recharts line chart
* Export to PDF via `jsPDF + autoTable`
* Handles empty states gracefully

### Insights Dashboard

* Loads all prescriptions + last 30 days’ day-wise counts
* **Analytics Computed:**

  * Top diagnoses
  * Most prescribed medicines
  * Age group distribution
  * Gender breakdown
  * Monthly trends (line chart)
  * Top patients by visit count
* Charts rendered via Chart.js (bar, doughnut, line)

### Patient History

* Fetches `/history`
* **Features:**

  * Search by patient name
  * Sort (New → Old / Old → New)
  * Pagination with “Load more” button
* Styled cards showing full details; medicines listed in bullets

### PDF Export

* Filters by date
* Exports full list to PDF via `jsPDF + autoTable`
* Print-ready using `react-to-print`

---

## 8. Styling & UX Enhancements

* Dark, animated gradient background with light text
* Cards: Rounded corners, gradient borders, hover lift
* Tables: Responsive, shadows, hover highlights
* Forms: Dark inputs, clear validation messages, styled selects
* Buttons: Gradient buttons with hover animations
* Alerts & Modals: Bootstrap-styled for consistency
* Patient History Cards: Gradient overlays, medicines rendered cleanly

---

## 9. Edge Cases & Improvements

* Axios vs Fetch mixed usage (should unify)
* `localStorage` used for authentication instead of JWT
* Bulk delete endpoint available but no UI button yet

---


