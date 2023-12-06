import { create } from "zustand";
import { persist } from "zustand/middleware";

type Daftar = {
  nama: string;
  email: string;
  password: string;
  token: string;
  updateNama: (nama: string) => void;
  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;
  updateToken: (token: string) => void;
};

export const useDaftar = create<Daftar>()(
  persist(
    (set) => ({
      nama: "",
      email: "",
      password: "",
      token: "",
      updateNama: (newNama: string) => set({ nama: newNama }),
      updateEmail: (newEmail: string) => set({ email: newEmail }),
      updatePassword: (newPassword: string) => set({ password: newPassword }),
      updateToken: (newToken: string) => set({ token: newToken }),
    }),
    {
      name: "user-storage",
    }
  )
);
