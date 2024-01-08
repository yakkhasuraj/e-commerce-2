import { ONE_SECOND } from "@/configs";
import { jwtDecode } from "jwt-decode";
import { isEmpty } from "./empty";

export const decodeJwt = (jwt) => jwtDecode(jwt);

export const isTokenExpired = (expiration) =>
  Date.now() / ONE_SECOND > expiration;

export const validateJwt = (jwt) => {
  if (isEmpty(jwt)) return { user: null, isAuthenticated: false };

  const decoded = decodeJwt(jwt);

  if (isTokenExpired(decoded.exp))
    return { user: null, isAuthenticated: false };

  return { user: decoded, isAuthenticated: true };
};
