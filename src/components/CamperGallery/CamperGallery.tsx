"use client";

import React, { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./CamperGallery.module.css";

interface GalleryItem {
  thumb: string;
  original: string;
}

interface CamperGalleryProps {
  gallery?: GalleryItem[];
  coverImage?: string;
}

export default function CamperGallery({
  gallery,
  coverImage,
}: CamperGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!gallery?.length && !coverImage) return null;

  if (!gallery || gallery.length === 0) {
    return (
      <div className={styles.galleryContainer}>
        <img src={coverImage} alt="Camper cover" className={styles.mainImage} />
      </div>
    );
  }

  // Динамічно перевіряємо, чи достатньо слайдів для створення нескінченної петлі
  const canLoopMain = gallery.length > 1;
  const canLoopThumbs = gallery.length > 4; // Бо slidesPerView дорівнює 4

  return (
    <div className={styles.galleryContainer}>
      {/* --- ГОЛОВНИЙ СЛАЙДЕР --- */}
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        loop={canLoopMain} // Використовуємо динамічне значення
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mainSwiper}
      >
        {gallery.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.original}
              alt={`View ${index + 1}`}
              className={styles.mainImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- НИЖНІЙ СЛАЙДЕР (Мініатюри) --- */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={canLoopThumbs} // Використовуємо динамічне значення
        spaceBetween={24}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.thumbSwiper}
      >
        {gallery.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={styles.thumbWrapper}>
              <img
                src={item.thumb}
                alt={`Thumb ${index + 1}`}
                className={styles.thumbImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
