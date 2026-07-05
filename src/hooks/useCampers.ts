import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCampers } from "../lib/api";
import { CampersResponse } from "../types/camper";

interface UseCampersParams {
  page: number;
  limit?: number;
  filters?: Record<string, any>;
}

export const useCampers = ({ page, limit = 4, filters }: UseCampersParams) => {
  return useQuery<CampersResponse, Error>({
    queryKey: ["campers", page, filters],
    queryFn: () => getCampers(page, limit, filters),
    placeholderData: keepPreviousData,
  });
};
