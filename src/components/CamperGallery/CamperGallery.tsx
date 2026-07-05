"use client";

import React, { useState } from "react";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

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
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!gallery?.length && !coverImage) return null;

  if (!gallery || gallery.length === 0) {
    return (
      <div className={styles.galleryContainer}>
        <img src={coverImage} alt="Camper cover" className={styles.mainImage} />
      </div>
    );
  }

  const canLoopMain = gallery.length > 1;

  return (
    <div className={styles.galleryContainer}>
      <Swiper
        onSwiper={setMainSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        loop={canLoopMain}
        spaceBetween={10}
        navigation={true}
        modules={[FreeMode, Navigation]}
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

      <Swiper
        spaceBetween={24}
        slidesPerView={4}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        className={styles.thumbSwiper}
      >
        {gallery.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className={`${styles.thumbWrapper} ${activeIndex === index ? styles.activeThumb : ""
                }`}
              onClick={() => {
                if (mainSwiper) {
                  mainSwiper.slideToLoop(index);
                }
              }}
            >
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