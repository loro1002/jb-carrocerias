// src/components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';
import logo from '../assets/logo.png';

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
      <Link to="/" className="logo" aria-label="Ir para a página inicial">
        <img src={logo} alt="Logo" className="logo-image" />
      </Link>
      <button className="menu-icon" onClick={toggleMenu} aria-label="Abrir menu">
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`navbar ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
        <ul className="nav-items">
          <li>
            <a href="#home" onClick={closeMenu}>Home</a>
          </li>
          <li>
            <a href="#about-us" onClick={closeMenu}>Sobre</a>
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
