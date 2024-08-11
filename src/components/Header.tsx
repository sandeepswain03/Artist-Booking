"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Artist Booking
      </Link>
      <nav>
        {!session ? (
          <>
            <Link href="/sign-up" className="mx-2">
              Sign-Up
            </Link>

            <Link href="/api/auth/signin" className="mx-2">
              Sign-In
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <img
              src={session.user?.image || "/default-avatar.png"}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <button className="mx-2">Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
