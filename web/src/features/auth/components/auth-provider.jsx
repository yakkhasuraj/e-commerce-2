"use client";

import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  return children;
};
