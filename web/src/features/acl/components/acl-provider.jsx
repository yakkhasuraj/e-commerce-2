"use client";

import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AclProvider = ({ children, roles = ["Admin"] }) => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
      return;
    }

    if (!roles.includes(user?.role)) {
      router.replace("/");
    }
  }, [isAuthenticated, roles, router, user?.role]);

  return children;
};
