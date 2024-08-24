"use client";
import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FiUser, FiPlusCircle, FiCalendar, FiMessageSquare } from 'react-icons/fi';

const navItems = [
  { href: "/profile", icon: FiUser, text: "Profile Settings" },
  { href: "/profile/add_concert", icon: FiPlusCircle, text: "Add Concert" },
  { href: "/profile/all_concerts", icon: FiCalendar, text: "All Concerts" },
  { href: "/profile/all_inquiry", icon: FiMessageSquare, text: "All Inquiries" },
];

const getBreadcrumbText = (path: string) => {
  const item = navItems.find(item => item.href === path);
  return item ? item.text : 'Profile';
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside id="hs-application-sidebar" className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-64 h-full fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 shadow-lg lg:relative lg:translate-x-0 lg:inset-0" role="dialog" tabIndex={-1} aria-label="Sidebar">
        <div className="flex flex-col h-full p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
          <nav className="space-y-4">
            {navItems.map(({ href, icon: Icon, text }) => (
              <Link key={href} href={href} className="flex items-center gap-x-3 py-2 px-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200">
                <Icon className="text-gray-500" size={20} />
                {text}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Breadcrumb */}
        <header className="sticky top-0 inset-x-0 z-20 bg-white border-b px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#D0204F]"
              aria-controls="hs-application-sidebar"
              data-hs-overlay="#hs-application-sidebar"
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <nav aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/profile" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                    Profile
                  </Link>
                </li>
                {pathname !== '/profile' && (
                  <li>
                    <div className="flex items-center">
                      <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                      </svg>
                      <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                        {getBreadcrumbText(pathname)}
                      </span>
                    </div>
                  </li>
                )}
              </ol>
            </nav>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
