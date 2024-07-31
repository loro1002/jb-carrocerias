// src/components/Gallery.jsx
import React from 'react';
import './Gallery.css';

const Gallery = ({ images }) => {
  const [showMore, setShowMore] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  // Função para alternar a exibição de mais imagens
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  // Função para abrir o modal com a imagem selecionada
  const handleOpenModal = (image) => {
    setSelectedImage(image);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Limitar o número de imagens exibidas
  const displayedImages = showMore ? images : images.slice(0, 6);

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Galeria</h2>
      <div className="gallery-grid">
        {displayedImages.map((image, index) => (
          <div key={index} className="gallery-item" onClick={() => handleOpenModal(image)}>
            <img src={image} alt={`Gallery ${index}`} className="gallery-image" />
          </div>
        ))}
      </div>
      {!showMore && images.length > 6 && (
        <button className="show-more-button" onClick={handleShowMore}>
          &#9660; Mostrar Mais
        </button>
      )}
      {showMore && (
        <button className="show-more-button" onClick={handleShowMore}>
          &#9650; Mostrar Menos
        </button>
      )}

      {/* Modal */}
      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Modal" className="modal-image" />
            <button className="modal-close" onClick={handleCloseModal}>&#10005;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
