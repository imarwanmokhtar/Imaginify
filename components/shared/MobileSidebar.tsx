"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"

const MobileSidebar = () => {
  const pathname = usePathname()

  return (
    <header className="flex justify-between items-center px-4 py-2 md:hidden">
      <Link href="/" className="flex items-center gap-2">
        <Image 
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <Sheet>
        <SheetTrigger>
          <Image 
            src="/assets/icons/menu.svg"
            alt="menu"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="sheet-content sm:w-64">
          <>
            <Image 
              src="/assets/images/logo-text.svg"
              alt="logo"
              width={152}
              height={23}
            />

            <SignedIn>
              <nav className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.route

                  return (
                    <Link
                      key={link.route}
                      href={link.route}
                      className={`${
                        isActive 
                          ? 'primary-gradient text-white'
                          : 'text-gray-700'
                      } flex items-center gap-2 p-4 rounded-lg`}
                    >
                      <Image 
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive ? 'brightness-200' : ''}`}
                      />
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="absolute bottom-4 left-4">
                <UserButton afterSignOutUrl="/" showName />
              </div>
            </SignedIn>

            <SignedOut>
              <div className="flex flex-col gap-2">
                <Link href="/sign-in">
                  <Button className="button bg-purple-gradient bg-cover w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="button border-2 border-purple-400 w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </SignedOut>
          </>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default MobileSidebar 