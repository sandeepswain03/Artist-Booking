"use client";
import Link from "next/link";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <h4 className="text-3xl font-bold mb-8 text-center text-[#4A3F6A]">
          Account Settings
        </h4>

        <div className="bg-gradient-to-br from-[#5E4B88] to-[#BCA7E7] shadow-lg rounded-lg flex flex-col lg:flex-row overflow-hidden">
          <aside className="w-full lg:w-1/4 p-6 bg-[#4A3F6A] text-[#EAD8FF]">
            <nav className="space-y-4">
              <Link
                className="block px-4 py-2 text-base font-medium hover:bg-[#8F75E5] rounded-lg transition-colors duration-200"
                href="/profile"
              >
                General
              </Link>
              <Link
                className="block px-4 py-2 text-base font-medium hover:bg-[#8F75E5] rounded-lg transition-colors duration-200"
                href="/profile/add_concert"
              >
                Add Concert
              </Link>
              <Link
                className="block px-4 py-2 text-base font-medium hover:bg-[#8F75E5] rounded-lg transition-colors duration-200"
                href="/profile/all_concerts"
              >
                All Concerts
              </Link>
            </nav>
          </aside>

          <div className="w-full lg:w-3/4 p-6 bg-[#EAD8FF]">{children}</div>
        </div>
      </div>
    </>
  );
}
