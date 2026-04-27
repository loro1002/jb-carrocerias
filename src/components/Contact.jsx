import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

const SERVICES = [
  'Reforma de carroceria de madeira',
  'Reforma de assoalho',
  'Fabricação de carroceria nova',
  'Pintura profissional',
  'Gavetas e cozinhas sob medida',
  'Para-barros',
  'Compartimentos e estruturas',
  'Carroceria usada',
  'Outro',
];

const INITIAL_FORM = { name: '', phone: '', service: '', message: '' };

const INFO_ITEMS = [
  { icon: FiMapPin, label: 'Endereço', value: 'R. São André, 3320 — Jardim São Cristóvão, Umuarama - PR' },
  { icon: FiPhone, label: 'Telefone', value: '+55 44 3639-4499' },
  { icon: FiMail, label: 'E-mail', value: 'contato@carroceriasjb.com.br' },
  { icon: FiClock, label: 'Horário', value: 'Seg–Sex: 08h–18h  •  Sáb: 08h–12h' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

export function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Informe seu nome';
    if (!form.phone.trim()) next.phone = 'Informe seu telefone';
    if (!form.service) next.service = 'Selecione um serviço';
    if (!form.message.trim()) next.message = 'Descreva brevemente o que precisa';
    return next;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length) {
        setErrors(errs);
        return;
      }

      const text = encodeURIComponent(
        `*Contato pelo site — Carrocerias JB*\n\n` +
          `*Nome:* ${form.name}\n` +
          `*Telefone:* ${form.phone}\n` +
          `*Serviço:* ${form.service}\n` +
          `*Mensagem:* ${form.message}`
      );

      window.open(`https://wa.me/5544999177845?text=${text}`, '_blank');
      setForm(INITIAL_FORM);
    },
    [form]
  );

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <div className="contact__left">
          <motion.span
            className="section-tag"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Fale conosco
          </motion.span>

          <motion.h2
            className="section-heading contact__heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Solicite um orçamento
          </motion.h2>

          <motion.p
            className="contact__desc"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Preencha o formulário e entraremos em contato pelo WhatsApp. Resposta rápida e
            sem compromisso.
          </motion.p>

          <div className="contact__info">
            {INFO_ITEMS.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                className="contact__info-item"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="contact__info-icon">
                  <Icon />
                </div>
                <div>
                  <span className="contact__info-label">{label}</span>
                  <span className="contact__info-value">{value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="contact__form-wrap"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__field">
              <label htmlFor="contact-name">Nome completo</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Seu nome"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                autoComplete="name"
              />
              {errors.name && <span className="contact__error">{errors.name}</span>}
            </div>

            <div className="contact__field">
              <label htmlFor="contact-phone">Telefone / WhatsApp</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="(44) 9 9999-9999"
                value={form.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
                autoComplete="tel"
              />
              {errors.phone && <span className="contact__error">{errors.phone}</span>}
            </div>

            <div className="contact__field">
              <label htmlFor="contact-service">Serviço de interesse</label>
              <select
                id="contact-service"
                name="service"
                value={form.service}
                onChange={handleChange}
                aria-invalid={!!errors.service}
              >
                <option value="">Selecione um serviço</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.service && <span className="contact__error">{errors.service}</span>}
            </div>

            <div className="contact__field contact__field--full">
              <label htmlFor="contact-message">Mensagem</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Descreva brevemente o que você precisa..."
                rows={4}
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <span className="contact__error">{errors.message}</span>
              )}
            </div>

            <button type="submit" className="contact__submit">
              <FaWhatsapp />
              Enviar pelo WhatsApp
              <FiSend />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
