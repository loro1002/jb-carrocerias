import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Gallery.css';

const INITIAL_VISIBLE = 6;

export function Gallery({ images }) {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visibleImages = showAll ? images : images.slice(0, INITIAL_VISIBLE);

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrev = useCallback(
    () => setLightboxIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  const goToNext = useCallback(
    () => setLightboxIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, goToPrev, goToNext]);

  return (
    <section id="gallery" className="gallery">
      <div className="gallery__header">
        <span className="section-tag">Nosso trabalho</span>
        <h2 className="section-heading gallery__title">Galeria</h2>
      </div>

      <div className="gallery__grid">
        {visibleImages.map((src) => {
          const globalIndex = images.indexOf(src);
          return (
            <motion.div
              key={src}
              className="gallery__item"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: (globalIndex % INITIAL_VISIBLE) * 0.06,
              }}
              onClick={() => openLightbox(globalIndex)}
              role="button"
              tabIndex={0}
              aria-label={`Abrir foto ${globalIndex + 1}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(globalIndex)}
            >
              <img
                src={src}
                alt={`Trabalho JB Carrocerias ${globalIndex + 1}`}
                loading="lazy"
              />
              <div className="gallery__overlay">
                <span>Ver foto</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {images.length > INITIAL_VISIBLE && (
        <button
          className="gallery__toggle"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? (
            <>
              <FiChevronUp /> Mostrar menos
            </>
          ) : (
            <>
              <FiChevronDown /> Ver mais fotos
            </>
          )}
        </button>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Visualizador de fotos"
          >
            <motion.div
              className="lightbox__content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightboxIndex]}
                alt={`Foto ${lightboxIndex + 1} de ${images.length}`}
              />

              <button
                className="lightbox__nav lightbox__nav--prev"
                onClick={goToPrev}
                aria-label="Foto anterior"
              >
                <FiChevronLeft />
              </button>

              <button
                className="lightbox__nav lightbox__nav--next"
                onClick={goToNext}
                aria-label="Próxima foto"
              >
                <FiChevronRight />
              </button>

              <button
                className="lightbox__close"
                onClick={closeLightbox}
                aria-label="Fechar"
              >
                <FiX />
              </button>

              <span className="lightbox__counter">
                {lightboxIndex + 1} / {images.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
