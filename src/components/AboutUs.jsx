import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';
import './AboutUs.css';
import aboutImage from '../assets/quen-somos.jpeg';

const VALUES = [
  {
    icon: FiTarget,
    title: 'Nossa Missão',
    text: 'Entregar soluções inovadoras e confiáveis no setor de implementos rodoviários, superando as expectativas dos clientes e impulsionando a eficiência do transporte.',
  },
  {
    icon: FiEye,
    title: 'Nossa Visão',
    text: 'Ser reconhecida como líder de mercado em implementos rodoviários, com produtos de alto desempenho e soluções personalizadas que antecipam as necessidades do setor.',
  },
  {
    icon: FiHeart,
    title: 'Nossos Valores',
    text: 'Excelência, inovação, comprometimento e sustentabilidade. Operamos com total transparência, respeitando clientes, colaboradores, fornecedores e a sociedade.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

export function AboutUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about-us" className="about">
      <div className="about__inner" ref={ref}>
        <motion.div
          className="about__media"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="about__image-wrap">
            <img
              src={aboutImage}
              alt="Equipe JB Carrocerias em ação"
              loading="lazy"
            />
          </div>
          <div className="about__badge">
            <span className="about__badge-value">20+</span>
            <span className="about__badge-label">anos no mercado</span>
          </div>
        </motion.div>

        <motion.div
          className="about__copy"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className="section-tag" variants={fadeUp}>
            Quem Somos
          </motion.span>

          <motion.h2 className="section-heading about__heading" variants={fadeUp}>
            Especialistas em<br />carrocerias de madeira
          </motion.h2>

          <motion.p className="about__text" variants={fadeUp}>
            Na JB Carrocerias, somos especialistas em reforma, revitalização e
            fabricação de carrocerias. Com mais de 20 anos de experiência no
            setor, nos destacamos pela dedicação e compromisso com a excelência.
          </motion.p>

          <motion.p className="about__text" variants={fadeUp}>
            Aplicamos técnicas avançadas com materiais de primeira linha. Nossos
            serviços abrangem reforma de carrocerias, restauração de assoalhos,
            montagem de gavetas e cozinhas personalizadas, pintura profissional e
            fabricação de carrocerias novas.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="about__values"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {VALUES.map(({ icon: Icon, title, text }) => (
          <motion.article key={title} className="about__value-card" variants={fadeUp}>
            <div className="about__value-icon">
              <Icon />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
