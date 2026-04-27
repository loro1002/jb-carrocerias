import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import './FloatingButtons.css';

export function FloatingButtons() {
  return (
    <div className="floating" aria-label="Links rápidos">
      <a
        href="https://wa.me/5544984225987?text=vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
        target="_blank"
        rel="noopener noreferrer"
        className="floating__btn floating__btn--wa"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <a
        href="https://www.instagram.com/carroceriasjb/"
        target="_blank"
        rel="noopener noreferrer"
        className="floating__btn floating__btn--ig"
        aria-label="Siga no Instagram"
      >
        <FaInstagram />
      </a>
    </div>
  );
}
