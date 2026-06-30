"use client";

import CampersFilter from "@/components/CampersFilter/CampersFilter";
import { Filter } from "@/types/camper";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import CamperCard from "../../components/CamperCard/CamperCard";
import { getCampers } from "../../lib/api";
import styles from "./Catalog.module.css";

export default function CatalogPage() {
  const [activeFilters, setActiveFilters] = useState<Filter | null>(null);

  // 2. Створюємо ту саму функцію, яку шукає React
  const handleApplyFilters = (newFilters: Filter) => {
    setActiveFilters(newFilters);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["campers"],
    // 1. Додаємо значення за замовчуванням = 1 для pageParam
    // 2. Перетворюємо pageParam на Number, щоб уникнути NaN в URL
    queryFn: ({ pageParam = 1 }) => getCampers(Number(pageParam), 4),

    initialPageParam: 1,

    getNextPageParam: (lastPage: any, allPages) => {
      // Якщо даних немає або прийшло менше 4 - це кінець
      if (!lastPage || !lastPage.campers || lastPage.campers.length < 4) {
        return undefined;
      }
      // Повертаємо номер наступної сторінки на основі кількості вже завантажених
      return allPages.length + 1;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20">Завантажуємо кемпери...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Помилка: {(error as Error).message}
      </div>
    );
  }

  return (
    <main className="container mx-auto py-10">
      <div className="grid gap-8">
        {/* Рендеримо всі сторінки, що прийшли з API */}
        {/* ЛІВА ЧАСТИНА: Блок з фільтрами */}
        <aside className={styles.aside}>
          <CampersFilter onSearch={handleApplyFilters} />
        </aside>
        {data?.pages.map((group: any, i: number) => (
          <div key={i}>
            {/* Додаємо .slice(0, 4), щоб гарантовано залишати лише 4 картки на кожній сторінці */}
            {group.campers?.slice(0, 4).map((camper: any) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </div>
        ))}
      </div>

      {/* Кнопка Load More */}
      {hasNextPage && (
        <div>
          <button
            className={styles.loadMoreBtn}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Завантаження..." : "Load more"}
          </button>
        </div>
      )}
    </main>
  );
}
