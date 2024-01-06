import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { useUser } from "@/lib/store/user";
import { UserStore } from "@/lib/interfaces/UserStore.interface";

export function useAuth() {
  const { user } = useUser() as UserStore;

  useLayoutEffect(() => {
    if (!user.id) {
      console.log("No hay usuario", user);
      redirect("/login");
    }
  }, [user]);
}
