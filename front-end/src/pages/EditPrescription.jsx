import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = "/api/v1/prescription";

const EditPrescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prescriptionDate: "",
    patientName: "",
    patientAge: "",
    patientGender: "",
    diagnosis: "",
    medicines: "",
    nextVisitDate: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Fetch prescription data
  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setFormData({
          prescriptionDate: response.data.prescriptionDate || "",
          patientName: response.data.patientName || "",
          patientAge: response.data.patientAge || "",
          patientGender: response.data.patientGender || "",
          diagnosis: response.data.diagnosis || "",
          medicines: response.data.medicines || "",
          nextVisitDate: response.data.nextVisitDate || "",
        });
      } catch (err) {
        console.error(err);
        setFetchError("Failed to load prescription. Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      } finally {
        setLoading(false);
      }
    };
    fetchPrescription();
  }, [id, navigate]);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.prescriptionDate)
      newErrors.prescriptionDate = "Prescription date is required.";
    if (!formData.patientName)
      newErrors.patientName = "Patient name is required.";
    if (!formData.patientAge) {
      newErrors.patientAge = "Patient age is required.";
    } else if (
      isNaN(formData.patientAge) ||
      parseInt(formData.patientAge, 10) < 0 ||
      parseInt(formData.patientAge, 10) > 130
    ) {
      newErrors.patientAge = "Age must be between 0 and 130.";
    }
    if (!formData.patientGender)
      newErrors.patientGender = "Patient gender is required.";
    return newErrors;
  };

  // Handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSaving(true);
    setSaved(false);

    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        ...formData,
        patientAge: parseInt(formData.patientAge, 10),
      });
      setSaved(true);
    } catch (err) {
      console.error(err);
      alert("Failed to update prescription. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container className="my-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
        <Footer />
      </>
    );
  }

  if (fetchError) {
    return (
      <>
        <Header />
        <Container className="my-5">
          <Alert variant="danger">{fetchError}</Alert>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="my-5">
        <h2 className="mb-4 text-center">Edit Prescription (ID: {id})</h2>
        {saved && (
          <Alert variant="success">Prescription updated successfully!</Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Prescription Date *</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.prescriptionDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      prescriptionDate: e.target.value,
                    })
                  }
                  isInvalid={!!errors.prescriptionDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.prescriptionDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Patient Name *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                  isInvalid={!!errors.patientName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.patientName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Patient Age *</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.patientAge}
                  onChange={(e) =>
                    setFormData({ ...formData, patientAge: e.target.value })
                  }
                  isInvalid={!!errors.patientAge}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.patientAge}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Patient Gender *</Form.Label>
                <Form.Select
                  value={formData.patientGender}
                  onChange={(e) =>
                    setFormData({ ...formData, patientGender: e.target.value })
                  }
                  isInvalid={!!errors.patientGender}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.patientGender}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              type="text"
              value={formData.diagnosis}
              onChange={(e) =>
                setFormData({ ...formData, diagnosis: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Medicines</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.medicines}
              onChange={(e) =>
                setFormData({ ...formData, medicines: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Next Visit Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.nextVisitDate}
              onChange={(e) =>
                setFormData({ ...formData, nextVisitDate: e.target.value })
              }
            />
          </Form.Group>

          <div className="d-flex flex-column flex-md-row gap-2">
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Saving..." : "Update Prescription"}
            </Button>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Back to List
            </Button>
          </div>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default EditPrescription;
