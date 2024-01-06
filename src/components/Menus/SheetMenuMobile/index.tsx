"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogIn, Menu, Power } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { useUser } from "@/lib/store/user";
import { useUserStore } from "@/lib/store/useUserStore";
import { UserStore } from "@/lib/interfaces/UserStore.interface";

import { linksDefault, linksUserAuth } from "../LinksMenu";



export default function SheetMenuMobile() {
  const pathname = usePathname();
  const userStore = useUserStore<UserStore, UserStore>(
    useUser,
    (state: any) => state
  );

  const { removeUser, isAuthBoolean } = userStore || {
    removeUser: () => {},
    isAuthBoolean: (): boolean => false,
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={28} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Descripcion Sheet</SheetDescription>
        </SheetHeader>
        <SheetContent></SheetContent>
        <section className="flex flex-col items-center sm:items-start">
          <p>Sheet content</p>
          {linksDefault.map((link) => (
            <Link
              key={link.label}
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
          ))}
          {isAuthBoolean() && (
            <>
              {linksUserAuth.map((link) => (
                <Link
                  key={link.label}
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
              ))}
            </>
          )}
          <Separator className="my-4" />
          {isAuthBoolean() ? (
            <SheetClose>
              <Button type="button" onClick={removeUser}>
                <Power size={18} />
                <span className="font-bold ml-1">Cerrar Sesion</span>
              </Button>
            </SheetClose>
          ) : (
            <Link href={"/login"}>
              <SheetClose>
                <Button type="button" className="bg-blue-500">
                  <LogIn size={18} />
                  <span className="font-bold ml-1">Iniciar Sesion</span>
                </Button>
              </SheetClose>
            </Link>
          )}
        </section>
      </SheetContent>
    </Sheet>
  );
}
