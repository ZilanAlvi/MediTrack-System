import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = "/api/v1/prescription";

const CreatePrescription = () => {
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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      formData.patientAge < 0 ||
      formData.patientAge > 120
    ) {
      newErrors.patientAge = "Age must be between 0 and 120.";
    }
    if (!formData.patientGender)
      newErrors.patientGender = "Patient gender is required.";
    return newErrors;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        ...formData,
        patientAge: Number(formData.patientAge),
      });

      setSubmitted(true);
      setFormData({
        prescriptionDate: "",
        patientName: "",
        patientAge: "",
        patientGender: "",
        diagnosis: "",
        medicines: "",
        nextVisitDate: "",
      });

      setTimeout(() => navigate("/prescriptions"), 1500);
    } catch (err) {
      console.error("Error saving prescription:", err);
      alert(
        "Error saving prescription: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <h1 className="mb-4">New Prescription</h1>

        {submitted && (
          <Alert variant="success">
            Prescription saved successfully! Redirecting...
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="prescriptionDate">
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
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.prescriptionDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="patientName">
                <Form.Label>Patient Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter patient's full name"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                  isInvalid={!!errors.patientName}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.patientName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="patientAge">
                <Form.Label>Patient Age *</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter patient's age"
                  value={formData.patientAge}
                  onChange={(e) =>
                    setFormData({ ...formData, patientAge: e.target.value })
                  }
                  isInvalid={!!errors.patientAge}
                  min="0"
                  max="120"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.patientAge}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="patientGender">
                <Form.Label>Patient Gender *</Form.Label>
                <Form.Select
                  value={formData.patientGender}
                  onChange={(e) =>
                    setFormData({ ...formData, patientGender: e.target.value })
                  }
                  isInvalid={!!errors.patientGender}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.patientGender}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="diagnosis">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter diagnosis details"
              value={formData.diagnosis}
              onChange={(e) =>
                setFormData({ ...formData, diagnosis: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="medicines">
            <Form.Label>Medicines</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="List prescribed medicines, one per line"
              value={formData.medicines}
              onChange={(e) =>
                setFormData({ ...formData, medicines: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="nextVisitDate">
            <Form.Label>Next Visit Date (Optional)</Form.Label>
            <Form.Control
              type="date"
              value={formData.nextVisitDate}
              onChange={(e) =>
                setFormData({ ...formData, nextVisitDate: e.target.value })
              }
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Saving..." : "Save Prescription"}
            </Button>
          </div>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default CreatePrescription;
