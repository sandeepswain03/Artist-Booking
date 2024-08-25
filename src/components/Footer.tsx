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
    { href: "/term&condition", text: "Terms & Conditions" },
    { href: "/privacypolicy", text: "Privacy Policy" },
  ];

  const contactInfo = [
    { Icon: FaMapMarkerAlt, href: "#", text: "Vadodara, Gujarat India" },
    { Icon: FaPhone, href: "#", text: "+123 456 7890" },
    { Icon: FaEnvelope, href: "#", text: "contactemail@gmail.com" },
  ];

  return (
    <footer className="mt-auto border-t border-gray-200 shadow-lg w-full">
      <div className="mt-auto w-full max-w-[85rem] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
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
            <h4 className="font-semibold text-black mb-3">Important Links</h4>
            <div className="grid space-y-2">
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
            <h4 className="font-semibold text-black mb-3">Contact Us</h4>
            <div className="grid space-y-2">
              {contactInfo.map(({ Icon, href, text }, index) => (
                <p key={index}>
                  <Link
                    className="inline-flex items-center gap-x-2 text-black hover:text-gray-600 focus:outline-none focus:text-gray-600"
                    href={href}
                  >
                    <Icon className="text-[#D0204F]" />
                    <span className="text-sm">{text}</span>
                  </Link>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-black mb-4 sm:mb-0">
            © 2024 Logo. All rights reserved.
          </p>

          <div className="flex justify-center space-x-2">
            {socialLinks.map(({ Icon, href }, index) => (
              <Link
                key={index}
                className="size-8 sm:size-10 inline-flex justify-center items-center text-sm font-semibold rounded-lg border border-transparent text-[#D0204F] hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
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
