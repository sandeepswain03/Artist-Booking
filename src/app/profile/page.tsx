import React from 'react';
import Image from 'next/image';

export default function AccountSettings() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Account settings</h4>

      <div className="bg-white shadow rounded-lg flex flex-col lg:flex-row">
        <aside className="w-full lg:w-1/4 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r">
          <nav className="space-y-2 sm:space-y-4">
            <a
              className="block px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-gray-700 bg-gray-100 rounded-lg"
              href="#account-general"
            >
              General
            </a>
            <a className="block px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg" href="#account-change-password">
              Change password
            </a>
            <a className="block px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg" href="#account-info">
              Info
            </a>
            <a className="block px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg" href="#account-social-links">
              Social links
            </a>
            <a className="block px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg" href="#account-connections">
              Connections
            </a>
            <a className="block px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg" href="#account-notifications">
              Notifications
            </a>
          </nav>
        </aside>

        <section className="w-full lg:w-3/4 p-4 sm:p-6">
          <div id="account-general" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-center">
              <Image
                src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="mt-4 sm:mt-0 sm:ml-4 space-y-2 text-center sm:text-left">
                <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Upload new photo
                </button>
                <button className="w-full sm:w-auto mt-2 sm:mt-0 px-4 py-2 border border-transparent rounded-md text-gray-500 hover:text-gray-700">
                  Reset
                </button>
                <p className="text-sm text-gray-500 mt-2 sm:mt-0">
                  Allowed JPG, GIF, or PNG. Max size of 800K
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="nmaxwell"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="Nelle Maxwell"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">E-mail</label>
                <input
                  type="email"
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="nmaxwell@mail.com"
                />
                <div className="mt-2 text-sm text-yellow-700 bg-yellow-100 border border-yellow-200 p-3 rounded-md">
                  Your email is not confirmed. Please check your inbox.
                  <br />
                  <a href="#" className="text-indigo-600 hover:text-indigo-800">Resend confirmation</a>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="Company Ltd."
                />
              </div>
            </div>
          </div>

          <div className="mt-6 text-right">
            <button className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">
              Save changes
            </button>
            <button className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3 px-6 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
