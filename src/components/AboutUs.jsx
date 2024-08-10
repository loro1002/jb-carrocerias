// src/components/AboutUs.jsx

import './AboutUs.css';
import aboutUsImage from '../assets/quen-somos.jpeg';

const AboutUs = () => {
  return (
    <div>
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
      <section className='content-about'>
        <article className='content-missao'>
          <h1>Nossa Missão</h1>
          <p>Nossa missão é entregar soluções inovadoras e confiáveis no setor de implementos rodoviários, sempre visando superar as expectativas dos nossos clientes. Nosso objetivo é impulsionar o crescimento e a eficiência do setor de transporte, fornecendo tecnologia avançada, qualidade superior e excelência no atendimento.</p>
        </article>
        <article className='content-visao'>
          <h1>Nossa Visão</h1>
          <p>Ser reconhecida como líder de mercado no segmento de implementos rodoviários, oferecendo produtos de alto desempenho e soluções personalizadas que atendam às necessidades dos nossos clientes. Buscamos constantemente a inovação, a sustentabilidade e a busca por melhores práticas em todos os aspectos do nosso negócio.</p>
        </article>
        <article className='content-valor'>
  <h1>Nossos Valores</h1>
  <p>
    Buscamos a excelência em nossos produtos e serviços, garantindo qualidade, durabilidade, e eficiência. 
    Estamos sempre inovando com novas tecnologias e processos para agregar valor aos nossos clientes. 
    Nosso comprometimento é total, com foco em cumprir prazos e garantir a satisfação do cliente. 
    Valorizamos a sustentabilidade, adotando práticas ecológicas em nossa produção. 
    Operamos de forma ética e transparente, respeitando clientes, colaboradores, fornecedores e a sociedade.
  </p>
</article>

      </section>
    </div>
  );
};

export default AboutUs;
