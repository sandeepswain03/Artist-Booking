"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  guestCount: number;
  contactNumber: string;
  occasion: string;
  date: string;
  city: string;
  budget: string;
  message: string;
}

export default function EnquiryList() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get("/api/enquiry");
        if (response.data.success) {
          setEnquiries(response.data.enquiries);
        } else {
          console.error("Failed to fetch enquiries:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchEnquiries();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setLoading(true);
    try {
      await axios.delete(`/api/enquiry?id=${id}`);
      setEnquiries((prevEnquiries) =>
        prevEnquiries.filter((enquiry) => enquiry._id !== id)
      );
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    } finally {
      setLoading(false);
      setDeletingId(null);
    }
  };

  return (
    <section className="w-full p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-sm shadow p-4 sm:p-7">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">All Inquiries</h2>
          <p className="text-sm text-gray-600">
            View and manage all incoming inquiries.
          </p>
        </div>
        <div className="space-y-6">
          {enquiries.length > 0 ? (
            enquiries.map((enquiry) => (
              <div
                key={enquiry._id}
                className="bg-gray-50 rounded-sm p-4 hover:shadow-md transition-shadow duration-300"
              >
                <h5 className="text-lg font-semibold text-gray-800 mb-3">
                  {enquiry.name} ({enquiry.occasion})
                </h5>
                <div className="grid sm:grid-cols-2 gap-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Email:</span> {enquiry.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Contact:</span> {enquiry.contactNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">City:</span> {enquiry.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Date:</span> {enquiry.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Guest Count:</span> {enquiry.guestCount}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Budget:</span> {enquiry.budget}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  <span className="font-semibold">Message:</span> {enquiry.message}
                </p>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleDelete(enquiry._id)}
                    disabled={loading && deletingId === enquiry._id}
                    className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent bg-[#D0204F] text-white hover:bg-[#B01C44] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#D0204F] focus:ring-offset-2 transition-all ${
                      loading && deletingId === enquiry._id
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    {loading && deletingId === enquiry._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No inquiries found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
