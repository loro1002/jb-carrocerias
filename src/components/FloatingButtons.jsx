
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import './FloatingButtons.css'; // Certifique-se de adicionar estilos apropriados

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <a href="https://wa.me/5544984225987" target="_blank" rel="noopener noreferrer" className="floating-button whatsapp">
        <FaWhatsapp />
      </a>
      <a href="https://www.instagram.com/carroceriasjb/" target="_blank" rel="noopener noreferrer" className="floating-button instagram">
        <FaInstagram />
      </a>
    </div>
  );
};

export default FloatingButtons;
