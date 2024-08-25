"use client";
import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const PrivacyPolicy = () => {
  const privacyPolicyContent = {
    Introduction: [
      "This privacy policy outlines the rules and regulations for the use of the Artist Booking App.",
      "The Artist Booking App is committed to protecting the privacy of its users.",
    ],
    "Collection of Personal Data": [
      "We collect personal data from users when they create an account or make a booking.",
      "The personal data we collect includes name, email address, phone number, and payment information.",
    ],
    "Use of Personal Data": [
      "We use personal data to provide and improve our services.",
      "We may also use personal data to contact users with updates and promotions.",
    ],
    "Protection of Personal Data": [
      "We take reasonable measures to protect personal data from unauthorized access, disclosure, alteration, and destruction.",
      "We use industry-standard encryption to protect personal data in transit and at rest.",
    ],
    "User Rights": [
      "Users have the right to access, correct, and delete their personal data.",
      "Users can contact us to exercise these rights.",
    ],
  };

  const phone = "+1 123 456 7890";
  const email = "support@artistbookingapp.com";

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="w-full">
        <div className="w-full bg-cover bg-center bg-no-repeat pt-20 sm:pt-28 pb-10 sm:pb-12 lg:pb-20 px-4 sm:px-6 lg:px-8 font-poppins">
          <h1 className="mb-6 sm:mb-8 text-center text-gray-900 font-bold font-manrope leading-tight text-3xl sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-gray-900 text-base sm:text-lg leading-7 sm:leading-8 text-center font-normal max-w-3xl mx-auto px-4">
            We're here to help. Reach us for any queries or concerns:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mt-6">
            <div className="flex items-center text-rose-600">
              <FaPhone className="mr-2" />
              <span className="font-semibold">{phone}</span>
            </div>
            <div className="flex items-center text-rose-600">
              <FaEnvelope className="mr-2" />
              <span className="font-semibold">{email}</span>
            </div>
          </div>
        </div>
        <section className="max-w-4xl mx-auto w-full relative overflow-hidden py-14 sm:py-20 lg:py-28 text-justify">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="font-manrope font-bold text-3xl sm:text-4xl text-gray-900 mb-6">
              Privacy Policy
            </h2>
            <div className="flex items-center gap-3 mb-8">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0054 8V12.5322C12.0054 12.8286 12.1369 13.1098 12.3645 13.2998L15 15.5M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"
                  stroke="#D32B58"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="font-medium text-lg sm:text-xl leading-8 text-rose-600">
                Last updated: May 26, 2023
              </p>
            </div>
            <p className="font-normal text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 mb-10">
              This privacy policy outlines the rules and regulations for the use
              of the Artist Booking App:
            </p>
            <div className="space-y-8 sm:space-y-12">
              {Object.entries(privacyPolicyContent).map(([key, value]) => (
                <div
                  key={key}
                  className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0"
                >
                  <h3 className="font-manrope font-bold text-xl sm:text-2xl text-gray-900 mb-4">
                    {key}
                  </h3>
                  <ul className="space-y-3">
                    {value.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="h-6 flex items-center sm:h-7">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-rose-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <p className="ml-2 text-base sm:text-lg text-gray-600">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
