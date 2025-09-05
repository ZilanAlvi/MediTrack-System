import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-content text-center">
        <p className="footer-text">
          &copy; 2025 <span className="footer-brand">MediTrack</span>. All
          rights reserved.
        </p>
      </div>
      <div className="footer-bar d-flex justify-content-center align-items-center">
        <a href="#" className="footer-link">
          Privacy Policy
        </a>
        <span className="divider">|</span>
        <a href="#" className="footer-link">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
