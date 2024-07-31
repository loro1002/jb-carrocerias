import React from 'react';
import './Header.css';
import truckImage from '../assets/galeria-1.jpg'; // Substitua pelo caminho da imagem do caminhão
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <h1>Produzimos carrocerias para caminhões com a máxima excelência e qualidade.</h1>
        <p>Nossa principal meta é fabricar produtos de alta qualidade e resistência, voltados para o futuro do transporte global de cargas.</p>
        <Link to="#about-us">
          <button>CONHEÇA NOSSA HISTÓRIA</button>
        </Link>
      </div>
      <div className="header-graphics">
        <div className="graphic-element yellow"></div>
        <div className="graphic-element gray"></div>
        <img src={truckImage} alt="Caminhão" className="truck-image" />
      </div>
    </div>
  );
};

export default Header;
