import { motion } from 'framer-motion';
import './Homologations.css';
import inmetroLogo from '../assets/inmetro-logo.png';
import detranLogo from '../assets/detran-sp.png';
import anfirLogo from '../assets/janfir-logo.png';
import ibamaLogo from '../assets/ibama-logo.png';

const LOGOS = [
  {
    src: inmetroLogo,
    alt: 'INMETRO — Instituto Nacional de Metrologia, Qualidade e Tecnologia',
  },
  {
    src: detranLogo,
    alt: 'DETRAN SP — Departamento de Trânsito de São Paulo',
  },
  {
    src: anfirLogo,
    alt: 'ANFIR — Associação Nacional dos Fabricantes de Implementos Rodoviários',
  },
  {
    src: ibamaLogo,
    alt: 'IBAMA — Instituto Brasileiro do Meio Ambiente',
  },
];

export function Homologations() {
  return (
    <section className="homolog">
      <div className="homolog__inner">
        <div className="homolog__text">
          <span className="section-tag">Certificações</span>
          <h2 className="section-heading homolog__heading">
            Somos Homologados
          </h2>
          <p>
            Trabalhamos em conformidade com os principais órgãos reguladores do
            setor de transportes, garantindo segurança e legalidade para você.
          </p>
        </div>

        <div className="homolog__logos">
          {LOGOS.map(({ src, alt }, i) => (
            <motion.div
              key={alt}
              className="homolog__logo"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img src={src} alt={alt} loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
