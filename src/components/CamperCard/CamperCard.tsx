import Link from "next/link";
import styles from "./CamperCard.module.css";

// Описуємо структуру даних, яка приходить з бекенду
interface CamperProps {
  camper: {
    id: string;
    name: string;
    price: number;
    rating: number;
    coverImage: string;
    engine: string;
    transmission: string;
    form: string;
    totalReviews?: number;
    location: string;
    description?: string;
    gallery?: { thumb: string; original: string }[];
  };
}

export default function CamperCard({ camper }: CamperProps) {
  const image = camper.coverImage || "/photo/hero-bg.jpg";

  return (
    <article className={styles.card}>
      {/* Ліва частина: РЕАЛЬНА Картинка з API */}
      <div className={styles.imageWrapper}>
        <img src={image} alt={camper.name} className={styles.image} />
      </div>

      {/* Права частина: Інформація */}
      <div className={styles.info}>
        <div className={styles.header}>
          <h2 className={styles.title}>{camper.name}</h2>
          <p className={styles.price}>€{camper.price}</p>
        </div>

        <div className={styles.ratingLocation}>
          <span className={styles.rating}>
            <svg
              className={styles.starIcon}
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use href="/icons/sprite.svg#icon-star" />
            </svg>
            {camper.rating} ({camper.totalReviews || 0} Reviews)
          </span>
          <span className={styles.location}>
            <svg width="16" height="16" aria-hidden="true">
              <use href="/icons/sprite.svg#icon-map" />
            </svg>
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>
          {camper.description
            ? camper.description.substring(0, 60) + "..."
            : "No description available"}
        </p>
        {/* Теги поки що заглушки, але скоро ми їх теж зробимо динамічними */}
        <div className={styles.tags}>
          <span className={styles.tag}>
            <svg width="20" height="20" aria-hidden="true">
              <use href="/icons/sprite.svg#icon-icon2" />
            </svg>
            {camper.engine}
          </span>
          <span className={styles.tag}>
            <svg width="20" height="20" aria-hidden="true">
              <use href="/icons/sprite.svg#icon-icon1" />
            </svg>
            {camper.transmission}
          </span>
          <span className={styles.tag}>
            <svg width="20" height="20" aria-hidden="true">
              <use href="/icons/sprite.svg#icon-car" />
            </svg>
            {camper.form}
          </span>
        </div>

        {/* ВИМОГА: Кнопка відкриває деталі в новій вкладці */}
        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
