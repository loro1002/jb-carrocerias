// src/App.jsx
import React from 'react';
import NavBar from './components/NavBar';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ServiceCard from './components/ServicesCard';
import AboutUs from './components/AboutUs';
import Gallery from './components/Gallery';
import image1 from './assets/quen-somos.jpeg';

import galeria1 from './assets/galeria-1.jpg'
import galeria2 from './assets/galeria-2.jpg'
import galeria3 from './assets/galeria-3.jpg'
import galeria4 from './assets/galeria-4.jpg'
import galeria5 from './assets/galeria-5.jpg'
import galeria6 from './assets/gasleria-6.jpg'
import galeria7 from './assets/galeria-7.png'
import galeria8 from './assets/galeria-8.jpg'
import galeria9 from './assets/galeria-9.jpg'

import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Map from './components/Map';
import Homologations from './components/Homologations';
import Header from './components/Header';

const images = [galeria1, galeria2, galeria3, galeria4, galeria5, galeria6, galeria7, galeria8, galeria9, image1];

const App = () => {
  return (
    <Router>
      <NavBar />
      <Header />
      <AboutUs />
      <ServiceCard />
      <Gallery images={images} />
      <Homologations />
      <FloatingButtons />
      <Map />
      <Footer />
    </Router>
  );
};

export default App;
