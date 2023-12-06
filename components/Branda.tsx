"use client";
import { useDaftar } from "@/store/zustand";
import React, { useEffect, useState } from "react";

export default function Branda() {
  const state = useDaftar();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center font-semibold text-4xl">
      {isClient && (state.token ? "Selamat Datang" : "Silahkan login")}
    </div>
  );
}
