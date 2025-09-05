import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="mb-4 custom-navbar">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/prescriptions"
          className="d-flex align-items-center logo-brand"
        >
          <Image src={logo} alt="MediTrack Logo" className="logo-image" />
          <span className="logo-text">MediTrack</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/prescriptions" end>
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/history">
              History
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Insights">
              Insights
            </Nav.Link>
            <Nav.Link as={NavLink} to="/reports">
              Reports
            </Nav.Link>
            <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
