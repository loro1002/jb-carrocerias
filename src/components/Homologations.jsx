import React from 'react';
import './Homologations.css';
import inmetroLogo from '../assets/inmetro-logo.png'; // Substitua pelos caminhos reais das imagens
import detranLogo from '../assets/detran-sp.png';
import anfirLogo from '../assets/janfir-logo.png';
import ibamaLogo from '../assets/ibama-logo.png';

const Homologations = () => {
  return (
    <div className="homologations-container">
      <div className="homologations-title">
        <span>SOMOS</span>
        <span>HOMOLOGADOS</span>
      </div>
      <div className="homologations-logos">
        <img src={inmetroLogo} alt="Inmetro Logo" />
        <img src={detranLogo} alt="Detran SP Logo" />
        <img src={anfirLogo} alt="Anfir Logo" />
        <img src={ibamaLogo} alt="Ibama Logo" />
      </div>
    </div>
  );
};

export default Homologations;
