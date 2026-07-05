import Link from "next/link";
import styles from "./CamperCard.module.css";

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

  // Функція-помічник: забирає підкреслення і робить першу літеру великою
  const formatText = (text: string) => {
    if (!text) return "";
    const withSpaces = text.replace(/_/g, " ");
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={camper.name} className={styles.image} />
      </div>

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
        <div className={styles.tags}>
          <span className={styles.tag}>
            <svg width="20" height="20" aria-hidden="true">
              <use href="/icons/sprite.svg#icon-icon2" />
            </svg>
            {formatText(camper.engine)}
          </span>
          <span className={styles.tag}>
            <svg width="20" height="20" aria-hidden="true">
              <use href="/icons/sprite.svg#icon-icon1" />
            </svg>
            {formatText(camper.transmission)}
          </span>
          <span className={styles.tag}>
            <svg width="20" height="20" aria-hidden="true">
              <use href="/icons/sprite.svg#icon-car" />
            </svg>
            {formatText(camper.form)}
          </span>
        </div>

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