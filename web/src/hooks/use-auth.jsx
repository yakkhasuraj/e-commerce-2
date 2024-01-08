import { ACCESS_TOKEN } from "@/configs";
import { validateJwt } from "@/utils";
import { useCookie } from "react-use";

export const useAuth = () => {
  const [value] = useCookie(ACCESS_TOKEN);

  const { user, isAuthenticated } = validateJwt(value);

  return { user, isAuthenticated };
};
