import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../AuthProviders/AuthContext';
const AfterLoginNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { username } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded={isMenuOpen ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-brand ms-5">Z2<b>D</b></div>
      <div className={`collapse navbar-collapse justify-content-center${isMenuOpen ? ' show' : ''}`} id="navbarCollapse">
        <ul className={`navbar-nav ${isMenuOpen ? 'animate show' : 'animate'}`}>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/mainHome">Home</Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Upload File</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">View Downloads</a>
          </li>
        </ul>
      </div>
      {!isMenuOpen && (
        <div className="navbar-nav ml-auto">
          <div className="d-flex align-items-center">
            <label className="nav-link pe-5" >{username}</label>
          </div>
        </div>
      )}
    </nav>
  )
}

export default AfterLoginNavbar