"use client";
import Link from "next/link";
import { useDaftar } from "@/store/zustand";
import { useRouter } from "next/navigation";

export default function Login() {
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
      email: state.email,
      password: state.password,
    };

    console.log(dataForm);
    try {
      const res = await fetch("https://gisapis.manpits.xyz/api/login", {
        method: "POST",
        body: JSON.stringify(dataForm),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(res);
      if (res.ok) {
        const token = await res.json();
        state.updateToken(token?.meta?.token);
        router.push("/");
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-semibold">Login</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Masukkan email"
          className="input input-bordered w-full max-w-xs"
          value={state.email}
          onChange={(e) => handleChange(e, state.updateEmail)}
        />
        <input
          type="password"
          placeholder="Masukkan password"
          className="input input-bordered w-full max-w-xs"
          value={state.password}
          onChange={(e) => handleChange(e, state.updatePassword)}
        />
        <button onClick={handleSumbit} className="btn btn-primary text-white">
          Login
        </button>
        <p className="text-sm text-center">
          Sudah punya akun?
          <Link href="/daftar" className="text-blue-500 ml-1">
            daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
