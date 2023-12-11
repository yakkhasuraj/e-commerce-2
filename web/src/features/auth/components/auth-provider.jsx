"use client";

import { ACCESS_TOKEN } from "@/configs";
import { isEmpty } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookie } from "react-use";

export const AuthProvider = ({ children }) => {
  const [value] = useCookie(ACCESS_TOKEN);
  const router = useRouter();

  useEffect(() => {
    if (isEmpty(value)) {
      router.replace("/auth/login");
    }
  }, [router, value]);

  return children;
};
