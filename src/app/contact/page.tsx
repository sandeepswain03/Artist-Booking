"use client";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { sendContactUsEmail } from "../../helpers/sendContatUsEmail";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
    phone: "",
  });
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await sendContactUsEmail(
        formData.email,
        formData.subject,
        formData.message,
        formData.phone
      );

      if (result.success) {
        setSubmitStatus("Message sent successfully!");
        setFormData({ email: "", subject: "", message: "", phone: "" });
      } else {
        setSubmitStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white px-6 sm:px-10 py-8 rounded-sm shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">Contact Us</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            We'd love to hear from you
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 space-y-6">
            {[
              { title: "Address", content: "Varodara, Gujrat\nIndia" },
              { title: "Phone", content: "+123 456 7890" },
              { title: "Email", content: "contactemail@gmail.com" },
            ].map(({ title, content }) => (
              <div key={title}>
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600">{content}</p>
              </div>
            ))}
            <div className="flex items-center text-gray-600">
              <p>Send us an email or use contact form</p>
              <AiOutlineArrowRight className="text-xl ml-2" />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="md:w-1/2 space-y-6">
            {["email", "phone", "subject", "message"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block mb-2 text-gray-600 text-sm font-medium"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === "message" ? (
                  <textarea
                    id={field}
                    name={field}
                    rows={6}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                    placeholder={`Your ${field}`}
                    required
                  />
                ) : (
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                        ? "tel"
                        : "text"
                    }
                    id={field}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                    placeholder={`Enter ${field}`}
                    required
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-[#CE1446] text-white py-2 px-4 rounded-sm text-sm sm:text-base font-medium tracking-wide hover:bg-[#B01238] transition-colors duration-300"
            >
              Send Message
            </button>
            {submitStatus && (
              <p
                className={`text-center ${
                  submitStatus.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submitStatus}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
