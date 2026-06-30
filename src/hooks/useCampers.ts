import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCampers } from "../lib/api";
import { CampersResponse } from "../types/camper";

// Описуємо параметри, які ми будемо передавати в наш хук
interface UseCampersParams {
  page: number;
  limit?: number;
  filters?: Record<string, any>;
}

export const useCampers = ({ page, limit = 4, filters }: UseCampersParams) => {
  return useQuery<CampersResponse, Error>({
    // queryKey — це "сигналізація" для React Query.
    // Коли page або filters зміняться, хук автоматично запустить запит заново!
    queryKey: ["campers", page, filters],

    // Сама функція запиту
    queryFn: () => getCampers(page, limit, filters),

    // Це потрібно для того, щоб під час гортання сторінок старі дані
    // не зникали миттєво, а плавно замінювалися новими (без "блимання")
    placeholderData: keepPreviousData,
  });
};
