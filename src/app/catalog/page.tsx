"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import CamperCard from "../../components/CamperCard/CamperCard";
import { getCampers } from "../../lib/api";
import styles from "./Catalog.module.css";

export default function CatalogPage() {
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
        <div className="mt-10 flex justify-center">
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
