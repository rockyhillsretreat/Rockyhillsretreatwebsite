import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '../../imports/RockyHillsRetreat_MelanieKate-15.jpg';
import img2 from '../../imports/RockyHillsRetreat_MelanieKate-20.jpg';
import img3 from '../../imports/RockyHillsRetreat_MelanieKate-24.jpg';
import img4 from '../../imports/RockyHillsRetreat_MelanieKate-30.jpg';
import img5 from '../../imports/RockyHillsRetreat_MelanieKate-35.jpg';
import img6 from '../../imports/RockyHillsRetreat_MelanieKate-42.jpg';
import img7 from '../../imports/RockyHillsRetreat_MelanieKate-52.jpg';
import img8 from '../../imports/O Bay sunset.jpg';
import img9 from '../../imports/RockyHillsRetreat_MelanieKate-67.jpg';
import img10 from '../../imports/RockyHillsRetreat_MelanieKate-75.jpg';
import img11 from '../../imports/RockyHillsRetreat_MelanieKate-80.jpg';
import img12 from '../../imports/RockyHillsRetreat_MelanieKate-1.jpg';
import img13 from '../../imports/RockyHillsRetreat_MelanieKate-5.jpg';
import img14 from '../../imports/RockyHillsRetreat_MelanieKate-10.jpg';
import img15 from '../../imports/Rosevear_RockyHills_006912.jpg';
import img16 from '../../imports/Rosevear_RockyHills_007615.jpg';
import img17 from '../../imports/RockyHillsRetreat_MelanieKate-45.jpg';
import img18 from '../../imports/RockyHillsRetreat_MelanieKate-60.jpg';

export function GalleryPage() {
  // All available images in a single array
  const allImages = [
    { src: img1, caption: 'The Retreat' },
    { src: img2, caption: 'Great Oyster Bay' },
    { src: img3, caption: 'Interior View' },
    { src: img4, caption: 'The Deck' },
    { src: img5, caption: 'Bedroom' },
    { src: img6, caption: 'Kitchen' },
    { src: img7, caption: 'The Bath' },
    { src: img8, caption: 'Sunset View' },
    { src: img9, caption: 'The Land' },
    { src: img10, caption: 'Night Sky' },
    { src: img11, caption: 'Coastal Views' },
    { src: img12, caption: 'Architecture' },
    { src: img13, caption: 'Living Space' },
    { src: img14, caption: 'Details' },
    { src: img15, caption: 'Interior' },
    { src: img16, caption: 'Landscape' },
    { src: img17, caption: 'Natural Light' },
    { src: img18, caption: 'The Experience' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      style={{ backgroundColor: '#26333A', minHeight: '100vh', position: 'relative' }}
    >
      {/* Header */}
      <div 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: '2rem',
          background: 'linear-gradient(to bottom, rgba(38, 51, 58, 0.8), transparent)',
          pointerEvents: 'none'
        }}
      >
        <div className="max-w-[1440px] mx-auto">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#EDE9E3',
              letterSpacing: '-0.01em',
              marginBottom: '0.5rem',
            }}
          >
            Gallery
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              color: '#B8AE9F',
            }}
          >
            {currentIndex + 1} of {allImages.length}
          </p>
        </div>
      </div>

      {/* Main Carousel */}
      <div 
        style={{ 
          position: 'relative',
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Image Container */}
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={allImages[currentIndex].src}
            alt={allImages[currentIndex].caption}
            style={{ 
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
          
          {/* Image Caption */}
          <div 
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              backgroundColor: 'rgba(46, 61, 69, 0.9)',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(143, 169, 179, 0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
                color: '#EDE9E3',
                margin: 0,
              }}
            >
              {allImages[currentIndex].caption}
            </p>
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          style={{
            position: 'absolute',
            left: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(46, 61, 69, 0.9)',
            border: '1px solid rgba(143, 169, 179, 0.5)',
            borderRadius: '50%',
            width: '3.5rem',
            height: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: '#8FA9B3',
            zIndex: 20,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(143, 169, 179, 0.3)';
            e.currentTarget.style.borderColor = '#8FA9B3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(46, 61, 69, 0.9)';
            e.currentTarget.style.borderColor = 'rgba(143, 169, 179, 0.5)';
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(46, 61, 69, 0.9)',
            border: '1px solid rgba(143, 169, 179, 0.5)',
            borderRadius: '50%',
            width: '3.5rem',
            height: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: '#8FA9B3',
            zIndex: 20,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(143, 169, 179, 0.3)';
            e.currentTarget.style.borderColor = '#8FA9B3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(46, 61, 69, 0.9)';
            e.currentTarget.style.borderColor = 'rgba(143, 169, 179, 0.5)';
          }}
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div 
        style={{
          position: 'absolute',
          bottom: '6rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem',
          padding: '1rem',
          backgroundColor: 'rgba(46, 61, 69, 0.9)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(143, 169, 179, 0.3)',
          maxWidth: '90vw',
          overflowX: 'auto',
          overflowY: 'hidden',
          zIndex: 20,
        }}
      >
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            style={{
              width: '3rem',
              height: '3rem',
              border: currentIndex === index ? '2px solid #8FA9B3' : '2px solid transparent',
              borderRadius: '0.25rem',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: currentIndex === index ? 1 : 0.5,
              flexShrink: 0,
              padding: 0,
              backgroundColor: '#2E3D45',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              if (currentIndex !== index) {
                e.currentTarget.style.opacity = '0.5';
              }
            }}
            aria-label={`Go to image ${index + 1}`}
          >
            <img
              src={image.src}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </button>
        ))}
      </div>

      {/* Photography Credit Footer */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1.5rem',
          textAlign: 'center',
          backgroundColor: 'rgba(38, 51, 58, 0.95)',
          borderTop: '1px solid rgba(143, 169, 179, 0.2)',
          zIndex: 20,
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.875rem',
            color: '#8FA9B3',
            margin: 0,
          }}
        >
          Photography by Melanie Kate Photography
        </p>
      </div>
    </div>
  );
}