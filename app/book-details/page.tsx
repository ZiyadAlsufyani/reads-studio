"use client"; // 👈 mark as client component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookDetailsPage() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("new") === "true") {
      router.replace("/books/new"); 
    } else {
      router.replace("/books"); 
    }
  }, []);

  return null;
}
