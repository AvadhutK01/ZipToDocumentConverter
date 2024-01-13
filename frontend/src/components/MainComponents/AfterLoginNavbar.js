import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../AuthProviders/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const AfterLoginNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { username, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  if (username != '') {
    localStorage.setItem('user', username);
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded={isMenuOpen ? 'true' : 'false'}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-brand ms-5">Z2<b>D</b></div>
      <div className={`collapse navbar-collapse justify-content-center${isMenuOpen ? ' show' : ''}`} id="navbarCollapse">
        <ul className={`navbar-nav ${isMenuOpen ? 'animate show' : 'animate'}`}>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/mainHome">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/uploadFiles">
              Upload File
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/viewDownloads">
              View Downloads
            </Link>
          </li>
        </ul>
      </div>
      {!isMenuOpen && (
        <div className="navbar-nav ml-auto">
          <div className="d-flex align-items-center pe-3">
            <label className="nav-link">{localStorage.getItem('user')}</label>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default AfterLoginNavbar