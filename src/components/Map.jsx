import React from 'react';
import './Map.css'; // Certifique-se de adicionar estilos apropriados

const Map = () => {
  return (
    <section id="map" className="map">
      <h2>Localização</h2>
      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11542.748511589516!2d-53.2756431!3d-23.780039!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f2d110eb7d1037%3A0x351bcfb15951b4e5!2sCARROCERIAS%20JB!5e1!3m2!1spt-BR!2sbr!4v1722385341156!5m2!1spt-BR!2sbr"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default Map;
