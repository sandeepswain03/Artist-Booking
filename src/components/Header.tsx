"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  HamburgerIcon,
  CloseIcon,
  HomeIcon,
  ArtistListIcon,
  DropdownIcon,
  ConcertIcon,
} from "./svgIcons";

const categories = [
  {
    name: "Bollywood Celebrity",
    href: "/",
  },
  {
    name: "Singers",
    href: "/",
  },
  {
    name: "Anchor/Standup Comedy",
    href: "/",
  },
];

function Header() {
  const { data: session } = useSession();
  return (
    <header className="flex flex-wrap  md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200 shadow-lg">
      <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 lg:py-4 px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center gap-x-1">
          <Link
            className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80"
            href="/"
          >
            Logo
          </Link>
          <button
            type="button"
            className="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
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
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block "
          aria-labelledby="hs-header-base-collapse"
        >
          <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="py-2 md:py-0  flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
              <div className="grow">
                <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
                  <Link
                    className="p-2 flex items-center text-sm bg-gray-100 text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
                    href="/"
                    aria-current="page"
                  >
                    <HomeIcon />
                    Home
                  </Link>

                  <div className="hs-dropdown [--strategy:static] md:[--strategy:fixed] [--adaptive:none] [--is-collapse:true] md:[--is-collapse:false] ">
                    <button
                      id="hs-header-base-dropdown"
                      type="button"
                      className="hs-dropdown-toggle w-full p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      aria-label="Dropdown"
                    >
                      <ArtistListIcon />
                      Artists
                      <DropdownIcon />
                    </button>

                    <div
                      className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative w-full md:w-52 hidden z-10 top-full ps-7 md:ps-0 md:bg-white md:rounded-lg md:shadow-md before:absolute before:-top-4 before:start-0 before:w-full before:h-5 md:after:hidden after:absolute after:top-1 after:start-[18px] after:w-0.5 after:h-[calc(100%-0.25rem)] after:bg-gray-100"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="hs-header-base-dropdown"
                    >
                      <div className="py-1 md:px-1 space-y-0.5">
                        {categories.map((category, index) => (
                          <Link
                            key={index}
                            className="p-2 md:px-3 flex items-center text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            href={category.href}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
                    href="/concerts"
                  >
                    <ConcertIcon />
                    Concerts
                  </Link>
                </div>
              </div>

              <div className="my-2 md:my-0 md:mx-2">
                <div className="w-full h-px md:w-px md:h-4 bg-gray-100 md:bg-gray-300"></div>
              </div>

              {!session ? (
                <>
                  <div className=" flex flex-wrap items-center gap-x-1.5">
                    <Link
                      className="py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
                      href="/api/auth/sign-in"
                    >
                      Sign in
                    </Link>
                    <Link
                      className="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      href="/sign-up"
                    >
                      Sign up
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className=" flex flex-wrap items-center gap-x-1.5">
                    <Link href="/profile">
                      <img
                        src={
                          "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                        }
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </Link>

                    <Link
                      className="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      href="/sign-out"
                    >
                      Sign out
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
