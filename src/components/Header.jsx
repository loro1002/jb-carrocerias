// src/components/Header.jsx

import './Header.css';
import truckImage from '../assets/galeria-1.jpg'; // Verifique se o caminho está correto
import { motion } from 'framer-motion'; // Importação do motion
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; // Importando ícones das redes sociais

const Header = () => {
  return (
    <header id='home' className="header-container">
      <div className="header-content">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Produzimos carrocerias para caminhões com a máxima excelência e qualidade.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Nossa principal meta é fabricar produtos de alta qualidade e resistência, voltados para o futuro do transporte global de cargas.
        </motion.p>
        <a
          href="https://wa.me/5544999177845?text=Eu%20venho%20do%20site%20gostaria%20de%20um%20or%C3%A7amento"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Link para WhatsApp para solicitar um orçamento"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Faça um orçamento!
          </motion.button>
        </a>
        <div className="social-icons" aria-label="Links para redes sociais">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
        </div>
      </div>
      <div className="header-graphics">
        <div className="graphic-element yellow" aria-hidden="true"></div>
        <div className="graphic-element gray" aria-hidden="true"></div>
        <motion.img
          src={truckImage}
          alt="Imagem de um caminhão ilustrando a produção de carrocerias"
          className="truck-image"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
    </header>
  );
};

export default Header;
