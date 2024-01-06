'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { linksDefault } from '../LinksMenu'

type Props = {}

export default function NavHeader({}: Props) {
    const pathname = usePathname()
  return (
    <nav className="h-8 hidden bg-gray-50 lg:flex lg:justify-evenly lg:items-center font-medium border-red-600 border-b-2">
        {linksDefault.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={clsx(
              "h-full px-2 flex items-center hover:bg-red-400 hover:text-white",
              {
                "bg-red-600 text-white": pathname === link.href,
              }
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
  )
}