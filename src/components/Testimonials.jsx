import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: 'João Carlos Menezes',
    role: 'Proprietário de transportadora — Cascavel, PR',
    text: 'Mandei reformar três carrocerias na JB e fiquei impressionado com a qualidade do serviço. Prazo cumprido e acabamento excelente. Já indiquei para outros colegas do setor.',
    rating: 5,
  },
  {
    name: 'Ricardo Alves',
    role: 'Gerente de frota — Maringá, PR',
    text: 'Trabalhamos com a JB há mais de 5 anos para manutenção e reforma da nossa frota. Profissionalismo total, equipe qualificada e preço justo. Empresa de confiança.',
    rating: 5,
  },
  {
    name: 'Marcos Ferreira',
    role: 'Caminhoneiro autônomo — Umuarama, PR',
    text: 'Fabricaram uma carroceria nova para mim do zero. Ficou exatamente como eu queria, personalizada e resistente. Atendimento nota 10 desde o orçamento até a entrega.',
    rating: 5,
  },
  {
    name: 'Ana Paula Santos',
    role: 'Diretora de logística — Campo Mourão, PR',
    text: 'A pintura profissional que fizeram nas nossas carretas ficou impecável. Resolveram um problema de assoalho que outros não conseguiram corrigir. Recomendo muito.',
    rating: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

export function Testimonials() {
  return (
    <section id="depoimentos" className="testimonials">
      <div className="testimonials__header">
        <span className="section-tag">Depoimentos</span>
        <h2 className="section-heading testimonials__title">
          O que nossos clientes dizem
        </h2>
      </div>

      <div className="testimonials__grid">
        {TESTIMONIALS.map((t, i) => (
          <motion.article
            key={t.name}
            className="testimonial-card"
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <div className="testimonial-card__icon">
              <FiMessageSquare />
            </div>

            <div className="testimonial-card__stars" aria-label={`${t.rating} estrelas`}>
              {Array.from({ length: t.rating }).map((_, j) => (
                <FaStar key={j} />
              ))}
            </div>

            <p className="testimonial-card__text">{t.text}</p>

            <footer className="testimonial-card__author">
              <div className="testimonial-card__avatar" aria-hidden="true">
                {t.name.charAt(0)}
              </div>
              <div>
                <span className="testimonial-card__name">{t.name}</span>
                <span className="testimonial-card__role">{t.role}</span>
              </div>
            </footer>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
