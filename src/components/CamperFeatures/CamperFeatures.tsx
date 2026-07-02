import { Camper } from "../../types/camper";
import styles from "./CamperFeatures.module.css";

interface CamperFeaturesProps {
  camper: Camper;
}

// Допоміжна функція для форматування тексту типу кузова
const formatForm = (form: string) => {
  switch (form) {
    case "panel_van":
      return "Panel truck";
    case "alcove":
      return "Alcove";
    case "integrated":
      return "Fully integrated";
    case "semi_integrated":
      return "Semi integrated";
    default:
      return form;
  }
};

export default function CamperFeatures({ camper }: CamperFeaturesProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Vehicle details</h3>

      {/* ВЕРХНЯ ЧАСТИНА: ТЕГИ (Без іконок) */}
      <ul className={styles.badges}>
        {/* Трансмісія */}
        <li className={styles.badge}>
          {camper.transmission === "automatic" ? "Automatic" : "Manual"}
        </li>

        {/* Двигун */}
        <li className={styles.badge}>
          {camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1)}
        </li>

        {/* Динамічні зручності (AC, Kitchen і т.д.) */}
        {camper.amenities.map((amenity) => (
          <li key={amenity} className={styles.badge}>
            {amenity === "ac" || amenity === "tv"
              ? amenity.toUpperCase()
              : amenity.charAt(0).toUpperCase() + amenity.slice(1)}
          </li>
        ))}

        {/* Тип кузова */}
        <li className={styles.badge}>{formatForm(camper.form)}</li>
      </ul>
      <div className={styles.divider}></div>

      {/* НИЖНЯ ЧАСТИНА: ТАБЛИЦЯ ДЕТАЛЕЙ */}
      <ul className={styles.detailsList}>
        <li className={styles.detailItem}>
          <span>Form</span>
          <span>{formatForm(camper.form)}</span>
        </li>
        <li className={styles.detailItem}>
          <span>Length</span>
          <span>{camper.length}</span>
        </li>
        <li className={styles.detailItem}>
          <span>Width</span>
          <span>{camper.width}</span>
        </li>
        <li className={styles.detailItem}>
          <span>Height</span>
          <span>{camper.height}</span>
        </li>
        <li className={styles.detailItem}>
          <span>Tank</span>
          <span>{camper.tank}</span>
        </li>
        <li className={styles.detailItem}>
          <span>Consumption</span>
          <span>{camper.consumption}</span>
        </li>
      </ul>
    </div>
  );
}
