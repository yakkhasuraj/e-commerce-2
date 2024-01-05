import { ONE_SECOND } from "@/configs";
import { jwtDecode } from "jwt-decode";

export const decodeJwt = (jwt) => jwtDecode(jwt);

export const isTokenExpired = (expiration) =>
  Date.now() / ONE_SECOND > expiration;
