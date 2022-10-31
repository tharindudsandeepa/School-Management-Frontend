import React from "react";
import Logo from "../../Assets/Logo.jpg";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={Logo} className="navImage" />
            School Management
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-5">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home Page
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/studentPage">
                  Student
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/lecturerPage">
                  Lecturer
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/module">
                  Module
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
