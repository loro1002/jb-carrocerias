import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar';
import { ScrollProgress } from './components/ScrollProgress';
import { Header } from './components/Header';
import { AboutUs } from './components/AboutUs';
import { ServiceCard } from './components/ServicesCard';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { Homologations } from './components/Homologations';
import { Contact } from './components/Contact';
import { LocationMap } from './components/Map';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';

import galeria1 from './assets/galeria-1.jpg';
import galeria2 from './assets/galeria-2.jpg';
import galeria3 from './assets/galeria-3.jpg';
import galeria4 from './assets/galeria-4.jpg';
import galeria5 from './assets/galeria-5.jpg';
import galeria6 from './assets/gasleria-6.jpg';
import galeria7 from './assets/galeria-7.png';
import galeria8 from './assets/galeria-8.jpg';
import galeria9 from './assets/galeria-9.jpg';
import quemSomosImage from './assets/quen-somos.jpeg';

const GALLERY_IMAGES = [
  galeria1,
  galeria2,
  galeria3,
  galeria4,
  galeria5,
  galeria6,
  galeria7,
  galeria8,
  galeria9,
  quemSomosImage,
];

const App = () => (
  <Router>
    <ScrollProgress />
    <NavBar />
    <main id="main-content">
      <Header />
      <AboutUs />
      <ServiceCard />
      <Testimonials />
      <Gallery images={GALLERY_IMAGES} />
      <Homologations />
      <Contact />
      <LocationMap />
      <Footer />
    </main>
    <FloatingButtons />
  </Router>
);

export default App;
