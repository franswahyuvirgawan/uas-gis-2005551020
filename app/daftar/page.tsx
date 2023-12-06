"use client";
import Link from "next/link";
import { useDaftar } from "@/store/zustand";
import { useRouter } from "next/navigation";

export default function Daftar() {
  const state = useDaftar();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: (value: string) => void
  ) => {
    set(e.target.value);
  };

  const handleSumbit = async () => {
    const dataForm = {
      name: state.nama,
      email: state.email,
      password: state.password,
    };
    try {
      const res = await fetch("https://gisapis.manpits.xyz/api/register", {
        method: "POST",
        body: JSON.stringify(dataForm),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        router.push("/login");
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-semibold">Daftar</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Masukkan nama"
          className="input input-bordered w-full max-w-xs"
          value={state.nama}
          onChange={(e) => handleChange(e, state.updateNama)}
        />
        <input
          type="text"
          placeholder="Masukkan email"
          className="input input-bordered w-full max-w-xs"
          value={state.email}
          onChange={(e) => handleChange(e, state.updateEmail)}
        />
        <input
          type="text"
          placeholder="Masukkan password"
          className="input input-bordered w-full max-w-xs"
          value={state.password}
          onChange={(e) => handleChange(e, state.updatePassword)}
        />
        <button onClick={handleSumbit} className="btn btn-primary text-white">
          Daftar
        </button>
        <p className="text-sm text-center">
          Sudah punya akun?
          <Link href="/login" className="text-blue-500 ml-1">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
