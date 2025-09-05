import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL = "/api/v1/prescription";

const DayWisePrescriptionReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch report from backend
  const fetchReport = async () => {
    if (!startDate || !endDate) {
      setReportData([]);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/daywise-report`, {
        params: { start: startDate, end: endDate },
      });

      const data = response.data.map((item) => ({
        date: item.prescriptionDate,
        count: item.count,
      }));

      setReportData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch report. Please try again.");
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when date range changes
  useEffect(() => {
    fetchReport();
  }, [startDate, endDate]);

  // Generate PDF
  const downloadPDF = () => {
    if (!reportData.length) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Daily Prescription Count Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Date", "Prescription Count"]],
      body: reportData.map((row) => [row.date, row.count]),
      theme: "grid",
      headStyles: { fillColor: [0, 123, 255] },
    });

    doc.save(`DailyPrescriptionReport_${startDate}_to_${endDate}.pdf`);
  };

  return (
    <>
      <Header />
      <main className="flex-grow py-5 bg-blue-light">
        <Container>
          <h1 className="mb-3">Daily Prescription Count Report</h1>
          <p className="text-dark fw mb-0">
            Analyze the number of prescriptions issued daily within a selected
            date range.
          </p>

          <div className="bg-blue-light rounded shadow-sm p-4 mb-4">
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
                <Col md={4} className="mt-2">
                  <Button
                    variant="success"
                    className="w-100"
                    onClick={downloadPDF}
                    disabled={!reportData.length}
                  >
                    Download PDF
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>

          <div className="bg-blue-light rounded shadow-sm p-4 mb-4 overflow-auto">
            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" role="status" />
              </div>
            ) : (
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Prescription Count</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.length ? (
                    reportData.map((row) => (
                      <tr key={row.date}>
                        <td>{row.date}</td>
                        <td>{row.count}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="text-center">
                        {startDate && endDate
                          ? "No data available"
                          : "Please select a date range"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </div>

          {reportData.length > 0 && (
            <div className="bg-white-dark rounded shadow-sm p-4">
              <h4 className="mb-3">Graphical View</h4>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={reportData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#007bff"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default DayWisePrescriptionReport;
