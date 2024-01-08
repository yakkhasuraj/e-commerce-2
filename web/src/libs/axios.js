import { TWENTY_SECOND } from "@/configs";
import { baseUrl } from "@/configs/env";
import axios from "axios";

export const v1 = "v1";

export const $axios = axios.create({
  baseURL: `${baseUrl}${v1}`,
  timeout: TWENTY_SECOND,
});

$axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { response } = error;
    return Promise.reject(response?.data ? response.data : error);
  }
);
