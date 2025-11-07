/**
 * Componente Slider
 * Carrusel reutilizable usando Swiper
 */

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

const Slider = ({
  items = [],
  Component,
  componentProps = {},
  slidesPerView = 1,
  spaceBetween = 20,
  navigation = true,
  pagination = true,
  autoplay = true,
  autoplayDelay = 3000,
  loop = true,
  centeredSlides = true,
  grabCursor = true,
  breakpoints = {
    800: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
  },
  className = '',
  slideHeight = '55vh'
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-5">
        <p style={{ color: 'var(--burgundy)' }}>No hay elementos para mostrar</p>
      </div>
    );
  }

  return (
    <div className={`slider-container ${className}`} style={{ padding: '20px 0' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        centeredSlides={centeredSlides}
        grabCursor={grabCursor}
        navigation={navigation}
        pagination={pagination ? {
          clickable: true,
          dynamicBullets: true
        } : false}
        autoplay={autoplay ? {
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } : false}
        loop={loop}
        breakpoints={breakpoints}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id || `slide-${index}`}>
            <div 
              className="d-flex align-items-center justify-content-center" 
              style={{ height: slideHeight, width: '100%' }}
            >
              {Component && (
                <Component 
                  item={item} 
                  {...componentProps}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for Swiper navigation and pagination */}
      <style jsx>{`
        .slider-container :global(.swiper-button-next),
        .slider-container :global(.swiper-button-prev) {
          color: var(--burgundy);
          background-color: rgba(208, 228, 247, 0.9);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .slider-container :global(.swiper-button-next:hover),
        .slider-container :global(.swiper-button-prev:hover) {
          background-color: var(--burgundy);
          color: var(--glacier);
          transform: scale(1.1);
        }

        .slider-container :global(.swiper-button-next::after),
        .slider-container :global(.swiper-button-prev::after) {
          font-size: 20px;
          font-weight: bold;
        }

        .slider-container :global(.swiper-pagination-bullet) {
          background-color: var(--burgundy);
          opacity: 0.4;
          width: 10px;
          height: 10px;
        }

        .slider-container :global(.swiper-pagination-bullet-active) {
          opacity: 1;
          width: 12px;
          height: 12px;
        }
      `}</style>
    </div>
  );
};

export default Slider;