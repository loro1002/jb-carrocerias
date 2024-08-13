import React from 'react';
import { FaInstagram, FaFacebookF, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './Footer.css'; // Certifique-se de adicionar estilos apropriados

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h2>Contato</h2>
          <p>Endereço: R. São André, 3320 - Jardim Sao Cristovao, Umuarama - PR, 87507-230</p>
          <p><FaPhoneAlt /> +55 44 3639-4499</p>
          <p><FaEnvelope /> contato@carroceriasjb.com.br</p>
        </div>
        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
        </div>
      </div>
      <div className="footer-copy">
        <p>&copy; 2024 Carrocerias JB. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
