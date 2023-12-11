import { ACCESS_TOKEN } from "@/configs";
import { isEmpty } from "@/utils";
import { useCookie } from "react-use";

export const useAuth = () => {
  const [value] = useCookie(ACCESS_TOKEN);

  return { value, isAuthenticated: !isEmpty(value) };
};
