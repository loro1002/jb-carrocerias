import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaTools,
  FaPaintRoller,
  FaCaravan,
  FaHome,
  FaWrench,
  FaBoxOpen,
} from 'react-icons/fa';
import './ServicesCard.css';

const SERVICES = [
  {
    icon: FaTools,
    title: 'Reforma de carrocerias',
    description:
      'Reforma e revitalização de carrocerias de madeira para garantir durabilidade e aparência renovada.',
  },
  {
    icon: FaHome,
    title: 'Reforma de assoalhos',
    description:
      'Reforma de assoalhos com acabamento novo e resistente para maior vida útil.',
  },
  {
    icon: FaCaravan,
    title: 'Gavetas e cozinhas',
    description:
      'Montagem sob medida de gavetas e cozinhas para carreta ou carroceria.',
  },
  {
    icon: FaTools,
    title: 'Para-barros',
    description:
      'Reforma e montagem de para-barros com ou sem lona para proteção e funcionalidade.',
  },
  {
    icon: FaPaintRoller,
    title: 'Pintura especializada',
    description:
      'Pintura profissional para carretas e carrocerias de madeira com acabamento impecável.',
  },
  {
    icon: FaWrench,
    title: 'Fabricação de carrocerias',
    description:
      'Fabricação de carrocerias novas personalizadas para atender necessidades específicas.',
  },
  {
    icon: FaBoxOpen,
    title: 'Compartimentos e estruturas',
    description:
      'Montagem de compartimentos e estruturas para otimizar espaço e funcionalidade.',
  },
  {
    icon: FaCaravan,
    title: 'Carrocerias usadas',
    description:
      'Carrocerias usadas em excelente estado, com rigorosa inspeção e manutenção garantida.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] },
  }),
};

export function ServiceCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="services" className="services" ref={ref}>
      <div className="services__header">
        <span className="section-tag">O que fazemos</span>
        <h2 className="section-heading services__title">Nossos Serviços</h2>
      </div>

      <div className="services__grid">
        {SERVICES.map((service, i) => (
          <motion.article
            key={service.title}
            className="services__card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="services__card-icon">
              <service.icon />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
