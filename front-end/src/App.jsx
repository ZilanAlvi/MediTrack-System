import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import Login from "./pages/Login.jsx";
import PrescriptionList from "./pages/PrescriptionList.jsx";
import CreatePrescription from "./pages/CreatePrescription.jsx";
import EditPrescription from "./pages/EditPrescription.jsx";
import DayWisePrescriptionCount from "./pages/DayWisePrescriptionCount.jsx";
import PdfView from "./pages/PdfView.jsx";
import InsightsDashboard from "./pages/InsightsDashboard.jsx";
import PatientHistory from "./pages/PatientHistory.jsx";

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" replace />;
};

// Logout helper
export const Logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
  return null;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/prescriptions"
          element={
            <PrivateRoute>
              <PrescriptionList />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePrescription />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditPrescription />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <DayWisePrescriptionCount />
            </PrivateRoute>
          }
        />
        <Route
          path="/pdf-view"
          element={
            <PrivateRoute>
              <PdfView />
            </PrivateRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <PrivateRoute>
              <InsightsDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <PatientHistory />
            </PrivateRoute>
          }
        />

        {/* Logout route */}
        <Route path="/logout" element={<Logout />} />

        {/* Redirect root "/" to /prescriptions */}
        <Route path="/" element={<Navigate to="/prescriptions" replace />} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/prescriptions" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
