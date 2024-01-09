import { PRODUCTS } from "@/configs";
import { $axios } from "@/libs/axios";
import useSWR from "swr";

const fetcher = ([url, params]) => $axios.get(url, { params });

export const useProducts = (params) => {
  const { data, error, isLoading } = useSWR([`/${PRODUCTS}`, params], fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
};
