// src/components/Homologations.jsx

import React from 'react';
import './Homologations.css';
import inmetroLogo from '../assets/inmetro-logo.png'; 
import detranLogo from '../assets/detran-sp.png';
import anfirLogo from '../assets/janfir-logo.png';
import ibamaLogo from '../assets/ibama-logo.png';

const Homologations = () => {
  return (
    <section className="homologations-container">
      <h2 className="homologations-title">
        <span>SOMOS</span>
        <span>HOMOLOGADOS</span>
      </h2>
      <div className="homologations-logos">
        <img src={inmetroLogo} alt="Logotipo do Inmetro, Instituto Nacional de Metrologia, Qualidade e Tecnologia" />
        <img src={detranLogo} alt="Logotipo do Detran SP, Departamento de Trânsito de São Paulo" />
        <img src={anfirLogo} alt="Logotipo da Anfir, Associação Nacional dos Fabricantes de Implementos Rodoviários" />
        <img src={ibamaLogo} alt="Logotipo do Ibama, Instituto Brasileiro do Meio Ambiente e dos Recursos Naturais Renováveis" />
      </div>
    </section>
  );
};

export default Homologations;
