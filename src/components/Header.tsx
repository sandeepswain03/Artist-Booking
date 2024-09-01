"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import {
  HamburgerIcon,
  CloseIcon,
  HomeIcon,
  ArtistListIcon,
  ConcertIcon,
  ContactUs,
} from "./svgIcons";

interface Avatar {
  public_id: string;
  url: string;
}

function Header() {
  const { data: session } = useSession();
  const user = session?.user as unknown as { avatar: Avatar[]; role: string };

  const navLinks = [
    { href: "/", icon: <HomeIcon />, text: "Home" },
    { href: "/artists", icon: <ArtistListIcon />, text: "Artists" },
    { href: "/concerts", icon: <ConcertIcon />, text: "Events" },
    { href: "/contact", icon: <ContactUs />, text: "Contact Us" },
  ];

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full shadow-md border-b border-gray-200">
      <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 lg:py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-x-1">
          <Link
            className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80"
            href="/"
          >
            <img
            src="/logo.png"
            className="h-5 lg:h-7"
            >
            
            </img>
          </Link>
          <button
            type="button"
            className="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-md border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            id="hs-header-base-collapse"
            aria-expanded="false"
            aria-controls="hs-header-base"
            aria-label="Toggle navigation"
            data-hs-collapse="#hs-header-base"
          >
            <HamburgerIcon />
            <CloseIcon />
          </button>
        </div>

        <div
          id="hs-header-base"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
          aria-labelledby="hs-header-base-collapse"
        >
          <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
              <div className="grow">
                <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      className="p-2 flex items-center text-sm font-semibold text-gray-800 hover:text-[#D0204F] focus:outline-none relative overflow-hidden group"
                      href={link.href}
                    >
                      <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-[#D0204F] flex items-center">
                        <span>{link.icon}</span>
                        <span>{link.text}</span>
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D0204F] transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="my-2 md:my-0 md:mx-2">
                <div className="w-full h-px md:w-px md:h-6 bg-[#D0204F]"></div>
              </div>

              {!session ? (
                <div className="flex flex-wrap items-center gap-x-1.5">
                  <Link
                    className="py-[7px] px-2.5 inline-flex items-center font-semibold text-sm rounded-sm bg-[#FAE7EC] text-[#D0204F] shadow-sm hover:bg-[#F5D0DA]"
                    href="/sign-in"
                  >
                    LOGIN
                  </Link>
                  <Link
                    className="py-2 px-2.5 inline-flex items-center font-semibold text-sm rounded-sm bg-[#D0204F] text-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                    href="/sign-up"
                  >
                    SIGN UP
                  </Link>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-x-1.5">
                  {user?.role === "artist" ? (
                    <Link href="/profile">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={user?.avatar?.[0]?.url || "/avatar.png"}
                          alt="Avatar"
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </Link>
                  ) : (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={user?.avatar?.[0]?.url || "/avatar.png"}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="py-2 px-2.5 inline-flex items-center font-semibold text-sm rounded-sm bg-[#D0204F] text-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
