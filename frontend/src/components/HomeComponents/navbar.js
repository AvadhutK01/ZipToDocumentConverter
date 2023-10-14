import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
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
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                </ul>
            </div>
            {!isMenuOpen && (
                <div className="navbar-nav ml-auto">
                    <div className="d-flex align-items-center">
                        <button className="nav-link pe-4" onClick={handleLoginClick}>Login</button>
                        <button className="nav-link pe-5" onClick={handleRegisterClick}>Register</button>
                    </div>
                </div>
            )}
        </nav>
    )
}
