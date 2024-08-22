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
    <section className="w-full lg:w-3/4 p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enquiries.length > 0 ? (
          enquiries.map((enquiry) => (
            <div
              key={enquiry._id}
              className="bg-blue-100 rounded-lg shadow-md p-4"
            >
              <h5 className="text-lg font-semibold text-gray-800">
                {enquiry.name} ({enquiry.occasion})
              </h5>
              <p className="text-sm text-gray-600 mt-2">
                Email: {enquiry.email}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Contact: {enquiry.contactNumber}
              </p>
              <p className="text-sm text-gray-600 mt-1">City: {enquiry.city}</p>
              <p className="text-sm text-gray-600 mt-1">Date: {enquiry.date}</p>
              <p className="text-sm text-gray-600 mt-1">
                Guest Count: {enquiry.guestCount}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Budget: {enquiry.budget}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Message: {enquiry.message}
              </p>
              <div className="mt-4 text-right">
                <button
                  onClick={() => handleDelete(enquiry._id)}
                  disabled={loading && deletingId === enquiry._id}
                  className={`px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition duration-200 ${
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
          <p className="text-center text-gray-600">No enquiries found.</p>
        )}
      </div>
    </section>
  );
}
