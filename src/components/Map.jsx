import './Map.css';

export function LocationMap() {
  return (
    <section id="map" className="location">
      <div className="location__header">
        <span className="section-tag">Onde estamos</span>
        <h2 className="section-heading location__heading">Localização</h2>
        <p>R. São André, 3320 — Jardim São Cristóvão, Umuarama - PR, 87507-230</p>
      </div>

      <div className="location__map">
        <iframe
          title="Localização JB Carrocerias"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11542.748511589516!2d-53.2756431!3d-23.780039!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f2d110eb7d1037%3A0x351bcfb15951b4e5!2sCARROCERIAS%20JB!5e1!3m2!1spt-BR!2sbr!4v1722385341156!5m2!1spt-BR!2sbr"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
