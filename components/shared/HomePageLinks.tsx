"use client"

import { navLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const HomePageLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="flex-center w-full gap-20">
      {navLinks.slice(1, 5).map((link) => {
        const isActive = pathname === link.route;
        
        return (
          <Link
            key={link.route}
            href={link.route}
            className="flex-center flex-col gap-2"
          >
            <li className="flex-center w-fit rounded-full bg-white p-4">
              <Image 
                src={link.icon} 
                alt={`${link.label} feature icon`} 
                width={24} 
                height={24} 
                className={`${isActive ? 'brightness-200' : ''}`}
              />
            </li>
            <p className="p-14-medium text-center text-white">{link.label}</p>
          </Link>
        );
      })}
    </ul>
  );
} 