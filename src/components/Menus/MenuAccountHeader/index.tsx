"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";

import {
  ChevronDown,
  UserCircle,
  LogIn,
  ClipboardSignature,
  Power
} from "lucide-react";

import { useUser } from "@/lib/store/user";
import { useUserStore } from "@/lib/store/useUserStore";
import { UserStore } from "@/lib/interfaces/UserStore.interface";

import { linksUserAuth } from "../LinksMenu";

export default function MenuAccountHeader() {
  const pathname = usePathname();
  const userStore = useUserStore<UserStore, UserStore>(
    useUser,
    (state: any) => state
  );

  const { user, removeUser, isAuthBoolean } = userStore || {
    removeUser: () => {},
    isAuthBoolean: (): boolean => false,
  };
  if (isAuthBoolean()) {
    return (
      <Menubar className="">
        <MenubarMenu>
          <MenubarTrigger>
            <UserCircle size={28} className="mr-1" />
            <div className="flex items-center">
              {user?.username}
              <ChevronDown size={16} />
            </div>
          </MenubarTrigger>
          <MenubarContent>
            {linksUserAuth.map((link) => (
              <>
                <MenubarItem key={link.label}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "hover:underline hover:underline-offset-4 hover:decoration-red-500 my-0.5",
                      {
                        "underline underline-offset-4 decoration-red-500":
                          pathname === link.href,
                      }
                    )}
                  >
                    {link.label}
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
              </>
            ))}
            <MenubarItem>
              <Button
                type="button"
                onClick={removeUser}
              >
                <Power size={18} />
                <span className="font-bold ml-1">Cerrar Sesion</span>
              </Button>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  } else {
    return (
      <section className="">
        <Link href={"/login"} className="mr-2">
          <Button type="button" className="bg-blue-500">
            <LogIn size={18} />
            <span className="font-bold ml-1">Iniciar Sesion</span>
          </Button>
        </Link>
        <Link href={"/registro"}>
          <Button type="button">
            <ClipboardSignature size={18} />
            <span className="font-bold ml-1">Registrarse</span>
          </Button>
        </Link>
      </section>
    );
  }
}
