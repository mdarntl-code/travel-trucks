import { Review } from "../../types/camper";
import styles from "./CamperReviews.module.css";

interface CamperReviewsProps {
  reviews: Review[];
}

export default function CamperReviews({ reviews }: CamperReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return <div className={styles.container}>No reviews yet.</div>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {reviews.map((review, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>

            <div className={styles.header}>
              <h4 className={styles.name}>{review.reviewer_name}</h4>

              <div className={styles.rating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={
                      star <= review.reviewer_rating
                        ? styles.starFilled
                        : styles.starEmpty
                    }
                    width="16"
                    height="16"
                  >
                    <use href="/sprite.svg#icon-star" />
                  </svg>
                ))}
              </div>
            </div>
            <p className={styles.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
