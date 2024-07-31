// src/components/AboutUs.jsx

import './AboutUs.css';
import aboutUsImage from '../assets/quen-somos.jpeg';

const AboutUs = () => {
  return (
    <section id="about-us" className="about-us">
      <div className="about-us-container">
        <figure className="about-us-image-container">
          <img src={aboutUsImage} alt="Sobre Nós" className="about-us-image" />
        </figure>
        <div className="about-us-text">
          <h2>Sobre Nós</h2>
          <p>
            Na nossa empresa, somos especialistas em reforma e revitalização de carrocerias, oferecendo um conjunto completo de serviços de alta qualidade. Com mais de 20 anos de experiência no setor, nos destacamos pela nossa dedicação e compromisso com a excelência.
          </p>
          <p>
            Trabalhamos com um foco inabalável na satisfação do cliente, aplicando técnicas avançadas e utilizando materiais de primeira linha. Nossos serviços incluem a reforma e revitalização de carrocerias de madeira, a restauração de assoalhos e a montagem personalizada de gavetas e cozinhas para carreta ou carroceria. Além disso, somos especialistas em pintura profissional para carretas e carrocerias de madeira, garantindo um acabamento impecável e duradouro.
          </p>
          <p>
            Nosso compromisso com a qualidade e a inovação nos permite oferecer soluções que atendem e superam as expectativas dos nossos clientes. Estamos sempre atualizados com as últimas tendências e técnicas para garantir que nossos serviços não apenas atendam, mas excedam os padrões da indústria.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
