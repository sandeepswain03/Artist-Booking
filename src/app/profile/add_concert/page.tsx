"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Upload } from "@/components/svgIcons";

const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const MAX_IMAGES = 3; // Maximum number of images allowed

export default function CreateConcertForm() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    concertImages: [] as File[],
    title: "",
    date: "",
    time: "",
    location: "",
    city: "",
    description: "",
    price: "",
    capacity: "",
    genre: "",
  });
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [totalImageSize, setTotalImageSize] = useState(0);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    // Recalculate total image size whenever concertImages changes
    const newTotalSize = formData.concertImages.reduce((acc, file) => acc + file.size, 0);
    setTotalImageSize(newTotalSize);
  }, [formData.concertImages]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newTotalSize = fileArray.reduce((acc, file) => acc + file.size, 0) + totalImageSize;
      const totalImages = formData.concertImages.length + fileArray.length;

      if (totalImages > MAX_IMAGES) {
        setAlert({ type: 'error', message: `You can only upload a maximum of ${MAX_IMAGES} images.` });
        return;
      }

      if (newTotalSize > MAX_TOTAL_SIZE) {
        setAlert({ type: 'error', message: "Total image size exceeds 5MB limit. Please select smaller or fewer images." });
        return;
      }

      setAlert(null);
      setFormData((prev) => ({
        ...prev,
        concertImages: [...prev.concertImages, ...fileArray],
      }));

      // Generate image previews
      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previewUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      const newConcertImages = [...prev.concertImages];
      newConcertImages.splice(index, 1);
      return { ...prev, concertImages: newConcertImages };
    });

    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      return newPreviews;
    });

    setAlert(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (Array.isArray(value)) {
          value.forEach((file) => data.append(key, file));
        } else {
          data.append(key, value);
        }
      }

      const response = await axios.post("/api/concert", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setAlert({ type: 'success', message: "Concert created successfully!" });
        // Reset form data after successful submission
        setFormData({
          concertImages: [],
          title: "",
          date: "",
          time: "",
          location: "",
          city: "",
          description: "",
          price: "",
          capacity: "",
          genre: "",
        });
        setImagePreviews([]);
        setTotalImageSize(0);
      } else {
        setAlert({ type: 'error', message: "Failed to create concert: " + response.data.message });
      }
    } catch (error) {
      console.error("Error creating concert:", error);
      setAlert({ type: 'error', message: "An error occurred while creating the concert." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <div className="bg-white rounded-sm shadow p-4 sm:p-7">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">Create Concert</h2>
          <p className="text-sm text-gray-600">
            Fill in the details to create a new concert.
          </p>
        </div>

        {alert && (
          <div className={`mb-4 p-4 ${alert.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} border rounded`}>
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label className="inline-block text-sm text-gray-800 mt-2.5">
                Concert Images
              </label>
            </div>
            <div className="sm:col-span-9">
              <div className="flex flex-col items-start gap-5">
                <input
                  type="file"
                  id="concertImages"
                  name="concertImages"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                  disabled={formData.concertImages.length >= MAX_IMAGES}
                />
                <label
                  htmlFor="concertImages"
                  className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-sm border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 cursor-pointer ${
                    formData.concertImages.length >= MAX_IMAGES ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload />
                  Upload Images ({formData.concertImages.length}/{MAX_IMAGES})
                </label>
                <p className="text-sm text-gray-500">
                  Total size: {(totalImageSize / 1024 / 1024).toFixed(2)} MB / 5 MB
                </p>
                {imagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          width={100}
                          height={100}
                          className="object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Title
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="date"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Date
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="time"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Time
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="location"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Location
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="city"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                City
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="description"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Description
              </label>
            </div>
            <div className="sm:col-span-9">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="py-2 px-3 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                required
              ></textarea>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="price"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                &#8377; Price
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="capacity"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Capacity
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="genre"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Genre
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="genre"
                name="genre"
                type="text"
                value={formData.genre}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-sm border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent bg-[#D0204F] text-white hover:bg-[#B01C44] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#D0204F] focus:ring-offset-2 transition-all"
            >
              {loading ? "Creating..." : "Create Concert"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
