import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Table,
  Container,
  Button,
  Form,
  Row,
  Col,
  Pagination,
  Modal,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaHistory } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./PrescriptionList.css";

const API_URL = "/api/v1/prescription";

// Delete prescription via backend
const deletePrescription = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (err) {
    console.error("Error deleting prescription:", err);
    throw err;
  }
};

const PrescriptionList = () => {
  const navigate = useNavigate();

  // Redirect if no session
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, [navigate]);

  const [prescriptions, setPrescriptions] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Archive modal
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [archiveId, setArchiveId] = useState(null);

  const rowsPerPage = 10;

  // Fetch all prescriptions (sorted by recent date)
  const fetchPrescriptions = async (start = "", end = "") => {
    try {
      let res;
      if (start && end) {
        res = await axios.get(`${API_URL}/by-date`, {
          params: { start, end },
        });
      } else {
        res = await axios.get(API_URL);
      }

      const sorted = res.data.sort(
        (a, b) => new Date(b.prescriptionDate) - new Date(a.prescriptionDate)
      );

      setPrescriptions(sorted);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPrescriptions();
  }, []);

  // Auto-fetch when dates change
  useEffect(() => {
    if (startDate && endDate) fetchPrescriptions(startDate, endDate);
  }, [startDate, endDate]);

  // Search filter
  const filteredPrescriptions = prescriptions.filter(
    (p) =>
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      (p.diagnosis && p.diagnosis.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPrescriptions.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentPrescriptions = filteredPrescriptions.slice(
    indexOfFirst,
    indexOfLast
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // Delete prescription
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePrescription(selectedId);
      setPrescriptions((prev) => prev.filter((p) => p.id !== selectedId));
      setShowDeleteModal(false);
      setSelectedId(null);
    } catch (err) {
      console.error("Error deleting prescription:", err);
      alert("Failed to delete prescription. Please try again.");
    }
  };

  // Archive prescription
  const handleArchiveClick = (id) => {
    setArchiveId(id);
    setShowArchiveModal(true);
  };

  const confirmArchive = async () => {
    try {
      const row = prescriptions.find((p) => p.id === archiveId);
      if (!row) return;

      await axios.post("/api/v1/history", row);
      setPrescriptions((prev) => prev.filter((p) => p.id !== archiveId));

      setShowArchiveModal(false);
      setArchiveId(null);
    } catch (err) {
      console.error("Error archiving row:", err);
      alert("Failed to archive row. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <Container className="container-custom">
        <Row className="filters-row mb-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by patient or diagnosis"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md={4} className="d-flex gap-2">
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Col>
          <Col md={4} className="text-end d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={() => navigate("/pdf-view")}>
              Show PDF
            </Button>
            <Button variant="primary" onClick={() => navigate("/create")}>
              <FaPlus /> New Prescription
            </Button>
          </Col>
        </Row>

        <div className="table-container">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Diagnosis</th>
                <th>Medicines</th>
                <th>Next Visit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPrescriptions.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.prescriptionDate}</td>
                  <td>{p.patientName}</td>
                  <td>{p.patientAge}</td>
                  <td>{p.patientGender}</td>
                  <td>{p.diagnosis}</td>
                  <td>{p.medicines}</td>
                  <td>{p.nextVisitDate}</td>
                  <td style={{ minWidth: "180px" }}>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-1"
                      onClick={() => navigate(`/edit/${p.id}`)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-1"
                      onClick={() => handleDeleteClick(p.id)}
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      variant="outline-info"
                      size="sm"
                      title="Archive to History"
                      onClick={() => handleArchiveClick(p.id)}
                    >
                      <FaHistory />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {[...Array(totalPages)].map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={currentPage === idx + 1}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </div>
      </Container>

      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this prescription? This action cannot
          be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Archive Modal */}
      <Modal
        show={showArchiveModal}
        onHide={() => setShowArchiveModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Archive Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to archive this prescription to history? This
          action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowArchiveModal(false)}
          >
            Cancel
          </Button>
          <Button variant="info" onClick={confirmArchive}>
            Yes, Archive
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default PrescriptionList;
