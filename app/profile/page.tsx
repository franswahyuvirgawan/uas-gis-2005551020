"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useDaftar } from "@/store/zustand";
import { useEffect, useState } from "react";

export default function Profile() {
  const state = useDaftar();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://gisapis.manpits.xyz/api/user", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        });
        // console.log(res);
        const data = await res.json();
        setData(data?.data?.user);
        // if (res.ok) {
        //   state.updateToken("");
        // } else {
        //   console.log("Oops! Something is wrong.");
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  console.log(data);
  return (
    <>
      <Navbar />
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <p>{data?.name}</p>
        <p>{data?.email}</p>
      </div>
      <Footer />
    </>
  );
}
