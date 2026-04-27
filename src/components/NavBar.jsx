import { useState, useEffect, useCallback } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';
import logo from '../assets/logo.png';

const NAV_LINKS = [
  { label: 'Início', href: '#home', id: 'home' },
  { label: 'Sobre', href: '#about-us', id: 'about-us' },
  { label: 'Serviços', href: '#services', id: 'services' },
  { label: 'Galeria', href: '#gallery', id: 'gallery' },
  { label: 'Contato', href: '#contact', id: 'contact' },
  { label: 'Localização', href: '#map', id: 'map' },
];

const WA_URL =
  'https://wa.me/5544999177845?text=Eu%20venho%20do%20site%20gostaria%20de%20um%20or%C3%A7amento';

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);

    const closest = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return { id, distance: Infinity };
      return { id, distance: Math.abs(el.getBoundingClientRect().top - 90) };
    }).reduce((min, s) => (s.distance < min.distance ? s : min));

    setActiveSection(closest.id);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth > 768) setMenuOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className={`nav${scrolled ? ' nav--solid' : ''}`}>
      <a href="#home" className="nav__brand" aria-label="Ir para o início">
        <img src={logo} alt="Carrocerias JB" />
      </a>

      <nav
        className={`nav__menu${menuOpen ? ' nav__menu--open' : ''}`}
        aria-label="Navegação principal"
      >
        <ul>
          {NAV_LINKS.map(({ label, href, id }) => (
            <li key={id}>
              <a
                href={href}
                onClick={closeMenu}
                className={activeSection === id ? 'nav__link--active' : ''}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="nav__cta"
      >
        Orçamento
      </a>

      <button
        className="nav__toggle"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
}
