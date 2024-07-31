// src/components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';
import logo from '../assets/logo.png'; // Certifique-se de que o caminho está correto

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
    <div>
      <header className='header'>
        <Link to="/" className='logo'>
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
          <ul className='navitens'>
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
      <section className='hero-section'>
        <div>
          <img src={logo} alt="" />
          <h2>Fone: 44 3639 4499</h2>
          <p>Rua Santo André, 3320 - Jd São Cristovão</p>
          <p>umuarama - Pr</p>
        </div>
      </section>
    </div>
  );
};

export default NavBar;
