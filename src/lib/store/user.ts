import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserJWTPayload } from "../interfaces/UserJWTPayload.interface";
import { UserStore } from "../interfaces/UserStore.interface";
export const useUser = create(
  persist(
    (set, get): UserStore => ({
      user: {} as UserJWTPayload,
      setUser: (user: UserJWTPayload) => set({ user }),
      removeUser: () => set({ user: {} as UserJWTPayload }),
      isAuthBoolean: () => {
        const { user } = get() as UserStore;
        return user.id ? true : false;
      }
    }),
    {
      name: "user-storage",
    }
  )
);