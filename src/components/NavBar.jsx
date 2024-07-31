// src/components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';
import logo from '../assets/logo.png'; // Verifique se o caminho está correto

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </Link>
      <button className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
        <ul className="nav-items">
          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>Sobre</Link>
          </li>
          <li>
            <a href="#services" onClick={closeMenu}>Serviços</a>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>Contato</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
