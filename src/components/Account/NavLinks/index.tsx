"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// icons
import {
  Contact2,
  MapPinned,
  CircleDollarSign,
  TableProperties,
} from "lucide-react";

const links = [
  { name: "Perfil", href: "/cuenta", icon: Contact2 },
  {
    name: "Dirección de envio",
    href: "/cuenta/direccion",
    icon: MapPinned,
  },
  { name: "Dirección de facturación", href: "/cuenta/bill", icon: CircleDollarSign },
  { name: "Ordenes", href: "/cuenta/ordenes", icon: TableProperties },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "w-64 flex items-center pl-3 py-2 font-medium hover:bg-red-400 hover:text-white transition-colors duration-200 rounded-md cursor-pointer",
              {
                "bg-red-600 text-white": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6 mr-2" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
