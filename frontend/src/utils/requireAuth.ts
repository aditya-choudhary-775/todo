"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token) {
      router.replace("/auth")
    }
  }, []);
};