import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import './Header.css';
import heroImage from '../assets/galeria-1.jpg';

const SOCIAL_LINKS = [
  {
    icon: FaInstagram,
    href: 'https://www.instagram.com/carroceriasjb/',
    label: 'Instagram',
  },
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaWhatsapp, href: 'https://wa.me/5544999177845', label: 'WhatsApp' },
];

const STATS = [
  { end: 20, suffix: '+', label: 'Anos de experiência' },
  { end: 500, suffix: '+', label: 'Carrocerias entregues' },
  { end: 100, suffix: '%', label: 'Homologado INMETRO' },
];

function useCountUp(end, inView, duration = 1800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, end, duration]);

  return count;
}

function StatItem({ end, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(end, inView);

  return (
    <div ref={ref} className="hero__stat">
      <span className="hero__stat-value">
        {count}
        {suffix}
      </span>
      <span className="hero__stat-label">{label}</span>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] },
  },
};

export function Header() {
  return (
    <section id="home" className="hero">
      <div className="hero__glow" aria-hidden="true" />

      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="section-tag hero__tag" variants={itemVariants}>
          Especialistas em Implementos Rodoviários
        </motion.span>

        <motion.h1 className="hero__title" variants={itemVariants}>
          Carrocerias que
          <br />
          <span className="hero__title-accent">resistem ao</span>
          <br />
          tempo.
        </motion.h1>

        <motion.p className="hero__desc" variants={itemVariants}>
          Fabricamos e reformamos carrocerias para caminhões com mais de 20 anos
          de experiência. Qualidade homologada, entrega garantida.
        </motion.p>

        <motion.div className="hero__actions" variants={itemVariants}>
          <a
            href="https://wa.me/5544999177845?text=Eu%20venho%20do%20site%20gostaria%20de%20um%20or%C3%A7amento"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn-primary"
          >
            Solicitar orçamento <FiArrowRight />
          </a>
          <a href="#about-us" className="hero__btn-ghost">
            Conheça a empresa
          </a>
        </motion.div>

        <motion.div className="hero__social" variants={itemVariants}>
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__visual"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero__image-frame">
          <img
            src={heroImage}
            alt="Carroceria JB fabricada para caminhão"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="hero__stats">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
