import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import './FloatingButtons.css'; // Certifique-se de adicionar estilos apropriados

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer" className="floating-button whatsapp">
        <FaWhatsapp />
      </a>
      <a href="https://instagram.com/your-instagram-profile" target="_blank" rel="noopener noreferrer" className="floating-button instagram">
        <FaInstagram />
      </a>
    </div>
  );
};

export default FloatingButtons;
