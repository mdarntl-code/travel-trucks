import { Camper } from "../../types/camper";
import styles from "./CamperInfo.module.css";

interface CamperInfoProps {
  camper: Camper;
}

export default function CamperInfo({ camper }: CamperInfoProps) {
  return (
    <div className={styles.infoCard}>
      <h2 className={styles.title}>{camper.name}</h2>

      <div className={styles.ratingLocation}>
        {/* Блок рейтингу (іконка + текст) */}
        <div className={styles.rating}>
          <svg width="16" height="16" className={styles.starIcon}>
            <use href="/icons/sprite.svg#icon-star" />
          </svg>
          <span>
            {/* ВИПРАВИЛА ТУТ: використовуємо camper.totalReviews */}
            {camper.rating}({camper.totalReviews || 0} Reviews)
          </span>
        </div>

        {/* Блок локації (іконка + текст) */}
        <div className={styles.location}>
          <svg width="16" height="16" className={styles.mapIcon}>
            <use href="/icons/sprite.svg#icon-map" />
          </svg>
          <span>{camper.location}</span>
        </div>
      </div>

      <p className={styles.price}>€{camper.price}</p>

      <p className={styles.description}>{camper.description}</p>
    </div>
  );
}
