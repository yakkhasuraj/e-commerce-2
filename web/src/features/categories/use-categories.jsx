import { CATEGORIES } from "@/configs";
import { $axios } from "@/libs/axios";
import useSWR from "swr";

const fetcher = ([url, params]) => $axios.get(url, { params });

export const useCategories = (params) => {
  const { data, error, isLoading } = useSWR(
    [`/${CATEGORIES}`, params],
    fetcher
  );

  return { data, isLoading, error };
};
