import { PRODUCTS } from "@/configs";
import { $axios } from "@/libs/axios";
import useSWR from "swr";

export const useProducts = (params) => {
  const { data, error, isLoading } = useSWR(
    [`/${PRODUCTS}`, params],
    ([url, params]) => $axios.get(url, { params })
  );

  return { data, isLoading, error };
};

export const useProduct = (fetch, id) => {
  const { data, error, isLoading } = useSWR(
    fetch ? `/${PRODUCTS}/${id}` : null,
    (url) => $axios.get(url)
  );

  return { data, isLoading, error };
};
