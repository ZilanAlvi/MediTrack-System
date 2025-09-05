import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const BASE_URL = "/api/v1/prescription";
const InsightsDashboard = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [dayWiseCounts, setDayWiseCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch all prescriptions
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch prescriptions");
        const data = await res.json();
        setPrescriptions(data);

        // Fetch last 30 days for day-wise visits
        const today = new Date().toISOString().split("T")[0];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        const start = startDate.toISOString().split("T")[0];

        const daywiseRes = await fetch(
          `${BASE_URL}/daywise-report?start=${start}&end=${today}`
        );
        if (!daywiseRes.ok) throw new Error("Failed to fetch daywise report");
        const daywiseData = await daywiseRes.json();
        setDayWiseCounts(daywiseData);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Helper functions
  const computeTopDiagnoses = (data) => {
    const counts = {};
    data.forEach((p) => {
      if (!p.diagnosis) return;
      p.diagnosis.split(",").forEach((d) => {
        const diag = d.trim();
        if (diag) counts[diag] = (counts[diag] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const computeMostMedicines = (data) => {
    const counts = {};
    data.forEach((p) => {
      if (!p.medicines) return;
      p.medicines.split(",").forEach((m) => {
        const med = m.trim();
        if (med) counts[med] = (counts[med] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const computeAgeDistribution = (data) => [
    data.filter((p) => p.patientAge <= 18).length,
    data.filter((p) => p.patientAge >= 19 && p.patientAge <= 35).length,
    data.filter((p) => p.patientAge >= 36 && p.patientAge <= 50).length,
    data.filter((p) => p.patientAge >= 51 && p.patientAge <= 65).length,
    data.filter((p) => p.patientAge > 65).length,
  ];

  const computeGenderDistribution = (data) => [
    data.filter((p) => p.patientGender.toLowerCase() === "male").length,
    data.filter((p) => p.patientGender.toLowerCase() === "female").length,
    data.filter(
      (p) => !["male", "female"].includes(p.patientGender.toLowerCase())
    ).length,
  ];

  const computeVisitsPerMonth = (dayWise) => {
    const monthCounts = Array(12).fill(0);
    dayWise.forEach((d) => {
      const month = new Date(d.prescriptionDate).getMonth();
      monthCounts[month] += d.count;
    });
    return monthCounts;
  };

  const computeTopVisitedPatients = (data) => {
    const counts = {};
    data.forEach((p) => {
      counts[p.patientName] = (counts[p.patientName] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, visits]) => ({ name, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5);
  };

  // Chart data
  const topDiagnoses = computeTopDiagnoses(prescriptions);
  const mostMedicines = computeMostMedicines(prescriptions);

  const ageDistributionData = {
    labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
    datasets: [
      {
        label: "Patients",
        data: computeAgeDistribution(prescriptions),
        backgroundColor: [
          "#a5d8ff",
          "#74c0fc",
          "#339af0",
          "#228be6",
          "#1c7ed6",
        ],
      },
    ],
  };

  const genderDistributionData = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "Gender",
        data: computeGenderDistribution(prescriptions),
        backgroundColor: ["#339af0", "#f783ac", "#dee2e6"],
        hoverOffset: 4,
      },
    ],
  };

  const visitsPerMonthData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Visits",
        data: computeVisitsPerMonth(dayWiseCounts),
        borderColor: "#339af0",
        backgroundColor: "rgba(51, 154, 240, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const topVisitedPatients = computeTopVisitedPatients(prescriptions);

  return (
    <>
      <Header />
      <Container fluid className="px-3 py-3">
        <h2 className="mb-4">Insights Dashboard</h2>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <Row className="mb-4">
              <Col xs={12} md={6} className="mb-3">
                <Card>
                  <Card.Header>Top Diagnoses</Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <tbody>
                        {topDiagnoses.map((d, idx) => (
                          <tr key={idx}>
                            <td>{d.name}</td>
                            <td>{d.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Card>
                  <Card.Header>Most Prescribed Medicines</Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <tbody>
                        {mostMedicines.map((m, idx) => (
                          <tr key={idx}>
                            <td>{m.name}</td>
                            <td>{m.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12} md={6} className="mb-3">
                <Card className="p-3">
                  <Card.Header>Patient Age Distribution</Card.Header>
                  <Bar
                    data={ageDistributionData}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: false } },
                    }}
                  />
                </Card>
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Card className="p-3">
                  <Card.Header>Patient Gender Distribution</Card.Header>
                  <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                    <Doughnut
                      data={genderDistributionData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: { legend: { position: "bottom" } },
                      }}
                    />
                  </div>
                </Card>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12} md={6} className="mb-3">
                <Card>
                  <Card.Header>Top Visited Patients</Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <tbody>
                        {topVisitedPatients.map((p, idx) => (
                          <tr key={idx}>
                            <td>{p.name}</td>
                            <td>{p.visits} visits</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Card className="p-3">
                  <Card.Header>Visits Per Month</Card.Header>
                  <Line
                    data={visitsPerMonthData}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: false } },
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default InsightsDashboard;
