"use client";

import { getCamperById, getCamperReviews } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import styles from "./CamperDetails.module.css";

import CamperFeatures from "../../../components/CamperFeatures/CamperFeatures";
import CamperGallery from "../../../components/CamperGallery/CamperGallery";
import CamperInfo from "../../../components/CamperInfo/CamperInfo";
import CamperReviews from "../../../components/CamperReviews/CamperReviews";
// import BookingForm from "../../../components/BookingForm/BookingForm";

export default function CamperDetailsPage() {
  const { camperId } = useParams();

  const {
    data: camper,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => getCamperById(camperId as string),
    enabled: !!camperId,
  });

  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["reviews", camperId],
    queryFn: () => getCamperReviews(camperId as string),
    enabled: !!camperId,
  });

  if (isLoading) {
    return <div className="text-center py-20">Завантажуємо деталі...</div>;
  }

  if (isError || !camper) {
    return (
      <div className="text-center py-20 text-red-500">
        Кемпер не знайдено 😢
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <section className={styles.topSection}>
        <div className={styles.leftColumn}>
          <CamperGallery
            gallery={camper.gallery}
            coverImage={camper.coverImage}
          />
        </div>

        <div className={styles.rightColumn}>
          <CamperInfo camper={camper} />
          <CamperFeatures camper={camper} />
        </div>
      </section>

      <section className={styles.bottomSection}>
        <div className={styles.leftColumn}>
          <CamperReviews reviews={reviews || []} />
        </div>

        <div className={styles.rightColumn}>
          {/* <BookingForm camperId={camper.id} /> */}
        </div>
      </section>
    </main>
  );
}
