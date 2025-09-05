import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../pages/PatientHistory.css";

const API_URL = "/api/v1/history";

const PatientHistory = () => {
  const [historyRecords, setHistoryRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch history from backend
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch history");
        const data = await res.json();
        const mapped = data.map((p) => ({
          id: p.id,
          patientName: p.patientName,
          age: p.patientAge,
          gender: p.patientGender,
          date: p.prescriptionDate,
          nextVisit: p.nextVisitDate,
          diagnosis: p.diagnosis,
          medicines: p.medicines ? p.medicines.split("\n") : [],
        }));
        setHistoryRecords(mapped);
      } catch (err) {
        console.error(err);
        setError("Failed to load history from backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Filter & sort
  const filteredHistory = historyRecords
    .filter((p) =>
      p.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortNewestFirst) return new Date(b.date) - new Date(a.date);
      return new Date(a.date) - new Date(b.date);
    });

  const loadMore = () => setVisibleCount((prev) => prev + 5);

  const cardGradients = [
    "linear-gradient(135deg, rgba(255,182,193,0.3), rgba(255,228,225,0.3))",
    "linear-gradient(135deg, rgba(173,216,230,0.3), rgba(224,255,255,0.3))",
    "linear-gradient(135deg, rgba(144,238,144,0.3), rgba(204,255,204,0.3))",
    "linear-gradient(135deg, rgba(255,255,224,0.3), rgba(255,250,205,0.3))",
  ];

  return (
    <>
      <Header />
      <Container className="my-4">
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={6}>
            <h1 className="fw-bold">Patient Prescription History</h1>
            <p className="text-muted">
              Search for a patient to view their archived prescriptions.
            </p>
          </Col>
          <Col xs={12} md={3} className="mt-3 mt-md-0 text-md-end">
            <Button
              variant="outline-primary"
              onClick={() => setSortNewestFirst(!sortNewestFirst)}
            >
              Sort: {sortNewestFirst ? "New → Old" : "Old → New"}
            </Button>
          </Col>
          <Col xs={12} md={3} className="mt-3 mt-md-0">
            <Form.Control
              type="text"
              placeholder="Search by patient name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : filteredHistory.length === 0 ? (
          <p className="text-center text-muted fs-5 mt-4">
            No history records found for "{searchTerm}"
          </p>
        ) : (
          <Row className="g-4">
            {filteredHistory.slice(0, visibleCount).map((p, idx) => (
              <Col xs={12} md={6} key={p.id}>
                <Card
                  className="prescription-card shadow-sm"
                  style={{
                    background: cardGradients[idx % cardGradients.length],
                  }}
                >
                  <Card.Body>
                    <Row>
                      <Col xs={12} sm={8}>
                        <p className="text-muted mb-1">
                          Prescription ID:{" "}
                          <span className="fw-semibold">{p.id}</span>
                        </p>
                        <p className="text-muted mb-1">
                          Prescription Date:{" "}
                          <span className="fw-semibold">{p.date}</span>
                        </p>
                        <h4 className="fw-bold">{p.patientName}</h4>
                        <div className="d-flex gap-3 text-muted flex-wrap">
                          <span>Age: {p.age}</span>
                          <span>Gender: {p.gender}</span>
                        </div>
                      </Col>
                      <Col xs={12} sm={4} className="text-sm-end mt-3 mt-sm-0">
                        <p className="text-muted mb-1">Next Visit Date</p>
                        <p className="fw-semibold">{p.nextVisit}</p>
                      </Col>
                    </Row>
                    <hr />
                    <h6 className="text-muted mb-0">Diagnosis</h6>
                    <p className="fw-semi">{p.diagnosis}</p>
                    <h6 className="text-muted mb-0">Medicines</h6>
                    <ul className="text-muted mb-0">
                      {p.medicines.map((med, i) => (
                        <li key={i}>{med}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {filteredHistory.length > visibleCount && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button onClick={loadMore} variant="primary">
                Load More
              </Button>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default PatientHistory;
