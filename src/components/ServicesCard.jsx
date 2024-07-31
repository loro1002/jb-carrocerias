import React from 'react';
import { FaTools, FaPaintRoller, FaCaravan, FaHome, FaWrench, FaBoxOpen } from 'react-icons/fa';
import './ServicesCard.css'; // Certifique-se de que o nome do arquivo CSS está correto

const services = [
  {
    icon: <FaTools />,
    title: "Reforma e revitalização de carrocerias de madeira",
    description: "Reforma e revitalização de carrocerias de madeira para garantir durabilidade e aparência."
  },
  {
    icon: <FaHome />,
    title: "Reforma de assoalhos",
    description: "Reforma de assoalhos para oferecer um acabamento novo e resistente."
  },
  {
    icon: <FaCaravan />,
    title: "Reforma e montagem de gavetas e cozinhas sob-medida",
    description: "Reforma e montagem de gavetas e cozinhas sob-medida para sua carreta ou carroceria."
  },
  {
    icon: <FaTools />,
    title: "Reforma e montagem de para-barros",
    description: "Reforma e montagem de para-barros com ou sem lona para proteção e funcionalidade."
  },
  {
    icon: <FaPaintRoller />,
    title: "Especializados em pintura para carretas e carrocerias de madeira",
    description: "Especializados em pintura para carretas e carrocerias de madeira para um acabamento profissional."
  },
  {
    icon: <FaWrench />,
    title: "Fabricação de carrocerias novas",
    description: "Fabricação de carrocerias novas personalizadas para atender às suas necessidades específicas."
  },
  {
    icon: <FaBoxOpen />,
    title: "Montagem de compartimentos e estruturas",
    description: "Montagem de compartimentos e estruturas para otimizar o espaço e a funcionalidade da sua carreta."
  },
  {
    icon: <FaCaravan />,
    title: "Reparo e manutenção de sistemas de freios",
    description: "Reparo e manutenção de sistemas de freios para garantir a segurança e eficiência de sua carreta."
  }
];

const ServiceCard = () => {
  return (
    <div>
      <h2 className='services-title'>Serviços</h2>
      <section id='services' className="service-cards">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ServiceCard;
