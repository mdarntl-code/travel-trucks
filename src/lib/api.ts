import axios from "axios";
import {
  BookingFormData,
  Camper,
  CampersResponse,
  Filter,
} from "../types/camper";

const api = axios.create({
  baseURL: "https://campers-api.goit.study",
});

// 1. Отримати список кемперів (з пагінацією та фільтрами)
export const getCampers = async (
  page: number = 1,
  limit: number = 4,
  filters?: Record<string, any>,
): Promise<CampersResponse> => {
  const { data } = await api.get("/campers", {
    params: {
      page,
      limit,
      ...filters, // Сюди ми передамо об'єкт з вибраними фільтрами
    },
  });
  return data;
};

// 2. Отримати одного кемпера по ID
export const getCamperById = async (id: string): Promise<Camper> => {
  const { data } = await api.get(`/campers/${id}`);
  return data;
};

// 3. Отримати список доступних фільтрів (для випадаючих списків)
export const getFilters = async (): Promise<Filter> => {
  const { data } = await api.get("/campers/filters");
  return data;
};

// 4. Відправити заявку на бронювання
export const bookCamper = async (
  camperId: string,
  formData: BookingFormData,
) => {
  const { data } = await api.post(
    `/campers/${camperId}/booking-requests`,
    formData,
  );
  return data;
};
