import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import './Footer.css';
import logo from '../assets/logo.png';

const SOCIAL_LINKS = [
  {
    icon: FaInstagram,
    href: 'https://www.instagram.com/carroceriasjb/',
    label: 'Instagram',
  },
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  {
    icon: FaWhatsapp,
    href: 'https://wa.me/5544984225987',
    label: 'WhatsApp',
  },
];

const CONTACT_ITEMS = [
  {
    icon: FiMapPin,
    text: 'R. São André, 3320 - Jardim São Cristóvão, Umuarama - PR',
  },
  { icon: FiPhone, text: '+55 44 3639-4499' },
  { icon: FiMail, text: 'contato@carroceriasjb.com.br' },
];

const NAV_LINKS = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre Nós', href: '#about-us' },
  { label: 'Serviços', href: '#services' },
  { label: 'Galeria', href: '#gallery' },
  { label: 'Localização', href: '#map' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="JB Carrocerias" />
          <p>
            Fabricação e reforma de carrocerias para caminhões com qualidade e
            excelência há mais de 20 anos.
          </p>
          <div className="footer__social">
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
          </div>
        </div>

        <div className="footer__nav">
          <h4>Navegação</h4>
          <ul>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Contato</h4>
          <ul>
            {CONTACT_ITEMS.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Carrocerias JB. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
