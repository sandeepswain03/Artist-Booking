import React from "react";
import Link from "next/link";
import { Facebook, Google, Twitter, Github } from "./svgIcons";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

function Footer() {
  const socialLinks = [
    { Icon: Facebook, href: "#" },
    { Icon: Google, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Github, href: "#" },
  ];

  const importantLinks = [
    { href: "/artists", text: "Artists" },
    { href: "/concerts", text: "Events" },
    { href: "/contact", text: "Contact Us" },
    { href: "/sign-up", text: "Sign Up" },
  ];

  const contactInfo = [
    { Icon: FaMapMarkerAlt, href: "#", text: "Vadodara, Gujarat India" },
    { Icon: FaPhone, href: "#", text: "+123 456 7890" },
    { Icon: FaEnvelope, href: "#", text: "contactemail@gmail.com" },
  ];

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
              {importantLinks.map((link, index) => (
                <p key={index}>
                  <Link
                    className="inline-flex gap-x-2 text-black hover:text-gray-600 focus:outline-none focus:text-gray-600"
                    href={link.href}
                  >
                    {link.text}
                  </Link>
                </p>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-black">Contact Us</h4>
            <div className="mt-3 grid space-y-3">
              {contactInfo.map(({ Icon, href, text }, index) => (
                <p key={index}>
                  <Link
                    className="inline-flex items-center gap-x-2 text-black hover:text-gray-600 focus:outline-none focus:text-gray-600"
                    href={href}
                  >
                    <Icon className="text-[#D0204F]" />
                    {text}
                  </Link>
                </p>
              ))}
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
            {socialLinks.map(({ Icon, href }, index) => (
              <Link
                key={index}
                className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#D0204F] hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                href={href}
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
