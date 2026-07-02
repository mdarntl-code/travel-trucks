"use client";

import CampersFilter from "@/components/CampersFilter/CampersFilter";
import { Filter } from "@/types/camper";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CamperCard from "../../components/CamperCard/CamperCard";
import { getCampers } from "../../lib/api";
import styles from "./Catalog.module.css";

export default function CatalogPage() {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

  const handleApplyFilters = (newFilters: Filter) => {
    const cleanFilters: Record<string, any> = {};

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== "" && value !== false) {
        cleanFilters[key] = value;
      }
    });

    setActiveFilters(cleanFilters);
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
    queryKey: ["campers", activeFilters],
    queryFn: ({ pageParam = 1 }) =>
      getCampers(Number(pageParam), 4, activeFilters),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages) => {
      if (!lastPage || !lastPage.campers || lastPage.campers.length < 4) {
        return undefined;
      }
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

  // Перевірка: чи прийшов порожній масив з бекенду?
  const hasNoCampers =
    !isLoading &&
    (!data?.pages[0]?.campers || data.pages[0].campers.length === 0);

  return (
    <main className={styles.catalogContainer}>
      {/* ЛІВА КОЛОНКА: Сайдбар (зверни увагу, він не в div) */}
      <aside className={styles.sidebarWrapper}>
        <CampersFilter onSearch={handleApplyFilters} />
      </aside>

      {/* ПРАВА КОЛОНКА: Список кемперів або напис "Нічого не знайдено" */}
      <div className={styles.listWrapper}>
        {hasNoCampers ? (
          <div className={styles.noResults}>
            <h3>No campers found 🏕️</h3>
            <p>
              We couldn't find any campers matching your filters. Try changing
              them!
            </p>
          </div>
        ) : (
          <>
            <div className={styles.cardsContainer}>
              {data?.pages.map((group: any, i: number) => (
                // ВАЖЛИВО: Використовуємо React.Fragment замість div
                <React.Fragment key={i}>
                  {group.campers?.slice(0, 4).map((camper: any) => (
                    <CamperCard key={camper.id} camper={camper} />
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* Кнопка Load More лежить під картками, у правій колонці */}
            {hasNextPage && (
              <div className={styles.loadMoreWrapper}>
                <button
                  className={styles.loadMoreBtn}
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
