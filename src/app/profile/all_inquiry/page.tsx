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
    fetchEnquiries();
  }, []);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
                  <EnquiryDetail label="Email" value={enquiry.email} />
                  <EnquiryDetail
                    label="Contact"
                    value={enquiry.contactNumber}
                  />
                  <EnquiryDetail label="City" value={enquiry.city} />
                  <EnquiryDetail
                    label="Date"
                    value={formatDate(enquiry.date)}
                  />
                  <EnquiryDetail
                    label="Guest Count"
                    value={enquiry.guestCount.toString()}
                  />
                  <EnquiryDetail label="Budget" value={`₹${enquiry.budget}`} />
                </div>
                <EnquiryDetail
                  label="Message"
                  value={enquiry.message}
                  className="mt-3"
                />
                <div className="mt-4 text-right">
                  <DeleteButton
                    onClick={() => handleDelete(enquiry._id)}
                    loading={loading && deletingId === enquiry._id}
                  />
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

const EnquiryDetail: React.FC<{
  label: string;
  value: string;
  className?: string;
}> = ({ label, value, className = "" }) => (
  <p className={`text-sm text-gray-600 ${className}`}>
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

const DeleteButton: React.FC<{ onClick: () => void; loading: boolean }> = ({
  onClick,
  loading,
}) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent bg-[#D0204F] text-white hover:bg-[#B01C44] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#D0204F] focus:ring-offset-2 transition-all ${
      loading ? "cursor-not-allowed opacity-50" : ""
    }`}
  >
    {loading ? "Deleting..." : "Delete"}
  </button>
);
