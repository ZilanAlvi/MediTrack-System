import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = "/api/v1/prescription";
const PdfView = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch prescriptions from backend
  const fetchPrescriptions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API_URL);
      setPrescriptions(res.data);
      setFilteredPrescriptions(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch prescriptions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  // Filter by date
  const handleFilter = () => {
    if (!startDate || !endDate) {
      setFilteredPrescriptions(prescriptions);
      return;
    }
    const filtered = prescriptions.filter((p) => {
      const presDate = new Date(p.prescriptionDate);
      return presDate >= new Date(startDate) && presDate <= new Date(endDate);
    });
    setFilteredPrescriptions(filtered);
  };

  // Download PDF
  const downloadPDF = () => {
    if (!filteredPrescriptions.length) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Prescription List", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [
        [
          "ID",
          "Date",
          "Patient",
          "Age",
          "Gender",
          "Diagnosis",
          "Medicines",
          "Next Visit",
        ],
      ],
      body: filteredPrescriptions.map((p) => [
        p.id,
        p.prescriptionDate,
        p.patientName,
        p.patientAge,
        p.patientGender,
        p.diagnosis,
        p.medicines,
        p.nextVisitDate,
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 123, 255] },
    });

    const filename = `Prescription_${startDate || "all"}_to_${
      endDate || "all"
    }.pdf`;
    doc.save(filename);
  };

  return (
    <>
      <Header />
      <main className="flex-grow py-5 bg-light">
        <Container>
          <h1 className="mb-3">Prescription List</h1>
          <p className="text-muted mb-4">
            View and download prescriptions. Filter by date range if needed.
          </p>

          {/* Filter & Download */}
          <div className="bg-white rounded shadow-sm p-4 mb-4">
            <Form>
              <Row className="align-items-end">
                <Col md={4} className="mb-2">
                  <Form.Group controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-2">
                  <Form.Group controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mt-2 d-flex gap-2">
                  <Button variant="primary" onClick={handleFilter}>
                    Apply Filter
                  </Button>
                  <Button
                    variant="success"
                    onClick={downloadPDF}
                    disabled={!filteredPrescriptions.length}
                  >
                    Download PDF
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>

          {/* Table */}
          <div className="bg-white rounded shadow-sm p-4 overflow-auto">
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" role="status" />
              </div>
            ) : (
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Diagnosis</th>
                    <th>Medicines</th>
                    <th>Next Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrescriptions.length ? (
                    filteredPrescriptions.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.prescriptionDate}</td>
                        <td>{p.patientName}</td>
                        <td>{p.patientAge}</td>
                        <td>{p.patientGender}</td>
                        <td>{p.diagnosis}</td>
                        <td>{p.medicines}</td>
                        <td>{p.nextVisitDate}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center">
                        {startDate && endDate
                          ? "No prescriptions found for this range."
                          : "No prescriptions available."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default PdfView;
