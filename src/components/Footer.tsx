import React from "react";
import Link from "next/link";
import { Facebook, Google, Twitter, Github } from "./svgIcons";

function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 shadow-lg w-full">
      <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <div className="col-span-full lg:col-span-3">
            <Link
              className="flex-none text-xl font-semibold text-black focus:outline-none focus:opacity-80"
              href="/"
              aria-label="Brand"
            >
              Brand
            </Link>
            <p className="mt-2 text-sm text-gray-600 text-justify">
              Your trusted partner in music and entertainment.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-black">Important Links</h4>

            <div className="mt-3 grid space-y-3">
              <p>
                <Link
                  className="inline-flex gap-x-2 text-black hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  href="#"
                >
                  Pricing
                </Link>
              </p>
              <p>
                <Link
                  className="inline-flex gap-x-2 text-black hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  href="#"
                >
                  Changelog
                </Link>
              </p>
              <p>
                <Link
                  className="inline-flex gap-x-2 text-black hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  href="#"
                >
                  Docs
                </Link>
              </p>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-black">Contact Us</h4>

            <div className="mt-3 grid space-y-3">
              <p>
                <Link
                  className="inline-flex gap-x-2 text-black hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  href="#"
                >
                  Blog
                </Link>
              </p>
              <p>
                <Link
                  className="inline-flex gap-x-2 text-black hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  href="#"
                >
                  Careers
                </Link>
              </p>
              <p>
                <Link
                  className="inline-flex gap-x-2 text-black hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  href="#"
                >
                  Customers
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
          <div className="flex justify-between items-center">
            <p className="text-sm text-black">
              © 2024 Logo. All rights reserved.
            </p>
          </div>

          <div>
            <Link
              className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#D0204F] hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
              <Facebook />
            </Link>
            <Link
              className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#D0204F] hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
              <Google />
            </Link>
            <Link
              className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#D0204F] hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
              <Twitter />
            </Link>
            <Link
              className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#D0204F] hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
              <Github />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
