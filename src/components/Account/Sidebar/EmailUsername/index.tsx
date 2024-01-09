"use client";
import { useUser } from "@/lib/store/user";
import { useUserStore } from "@/lib/store/useUserStore";
import { UserStore } from "@/lib/interfaces/UserStore.interface";

type Props = {};

export default function EmailUsername({}: Props) {
  const userStore = useUserStore<UserStore, UserStore>(
    useUser,
    (state: any) => state
  );

  const { user } = userStore || {};
  return <p>{user?.username}</p>;
}
