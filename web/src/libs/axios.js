import { ACCESS_TOKEN, TWENTY_SECOND } from "@/configs";
import { baseUrl } from "@/configs/env";
import axios from "axios";
import Cookies from "js-cookie";

export const v1 = "v1";

export const $axios = axios.create({
  baseURL: `${baseUrl}${v1}`,
  timeout: TWENTY_SECOND,
});

$axios.interceptors.request.use(
  function (config) {
    const token = Cookies.get(ACCESS_TOKEN);
    config.headers.Authorization = `Bearer ${token}`;
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
