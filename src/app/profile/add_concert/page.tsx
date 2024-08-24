"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Upload } from "@/components/svgIcons";

const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const MAX_IMAGES = 3;

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
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const newTotalSize = formData.concertImages.reduce(
      (acc, file) => acc + file.size,
      0
    );
    setTotalImageSize(newTotalSize);
  }, [formData.concertImages]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newTotalSize =
      fileArray.reduce((acc, file) => acc + file.size, 0) + totalImageSize;
    const totalImages = formData.concertImages.length + fileArray.length;

    if (totalImages > MAX_IMAGES) {
      setAlert({
        type: "error",
        message: `You can only upload a maximum of ${MAX_IMAGES} images.`,
      });
      return;
    }

    if (newTotalSize > MAX_TOTAL_SIZE) {
      setAlert({
        type: "error",
        message:
          "Total image size exceeds 5MB limit. Please select smaller or fewer images.",
      });
      return;
    }

    setAlert(null);
    setFormData((prev) => ({
      ...prev,
      concertImages: [...prev.concertImages, ...fileArray],
    }));
    setImagePreviews((prev) => [
      ...prev,
      ...fileArray.map((file) => URL.createObjectURL(file)),
    ]);
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
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file) => data.append(key, file));
        } else {
          data.append(key, value);
        }
      });

      const response = await axios.post("/api/concert", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setAlert({ type: "success", message: "Concert created successfully!" });
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
        setAlert({
          type: "error",
          message: "Failed to create concert: " + response.data.message,
        });
      }
    } catch (error) {
      console.error("Error creating concert:", error);
      setAlert({
        type: "error",
        message: "An error occurred while creating the concert.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white px-6 sm:px-10 py-8 rounded-sm shadow-md"
      >
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Create Concert
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Fill in the details to create a new concert
            </p>
          </div>

          {alert && (
            <div
              className={`p-4 ${
                alert.type === "success"
                  ? "bg-green-100 border-green-400 text-green-700"
                  : "bg-red-100 border-red-400 text-red-700"
              } border rounded`}
            >
              {alert.message}
            </div>
          )}

          <div>
            <label className="block mb-2 text-gray-600 text-sm font-medium">
              Concert Images
            </label>
            <div className="flex flex-col items-start gap-2">
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
                  formData.concertImages.length >= MAX_IMAGES
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Upload />
                Upload Images ({formData.concertImages.length}/{MAX_IMAGES})
              </label>
              <p className="text-sm text-gray-500">
                Total size: {(totalImageSize / 1024 / 1024).toFixed(2)} MB / 5
                MB
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

          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-gray-600 text-sm font-medium"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
              placeholder="Enter concert title"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-gray-600 text-sm font-medium"
              >
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block mb-2 text-gray-600 text-sm font-medium"
              >
                Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="location"
                className="block mb-2 text-gray-600 text-sm font-medium"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                placeholder="Enter location"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-gray-600 text-sm font-medium"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                placeholder="Enter city"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-gray-600 text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
              rows={3}
              placeholder="Enter concert description"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-gray-600 text-sm font-medium"
              >
                Price (₹)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                placeholder="Enter price"
                required
              />
            </div>
            <div>
              <label
                htmlFor="capacity"
                className="block mb-2 text-gray-600 text-sm font-medium"
              >
                Capacity
              </label>
              <input
                id="capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                placeholder="Enter capacity"
                required
              />
            </div>
            <div>
              <label
                htmlFor="genre"
                className="block mb-2 text-gray-600 text-sm font-medium"
              >
                Genre
              </label>
              <input
                id="genre"
                name="genre"
                type="text"
                value={formData.genre}
                onChange={handleChange}
                className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                placeholder="Enter genre"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-x-2">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-sm border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent bg-[#CE1446] text-white hover:bg-[#B01238] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#CE1446] focus:ring-offset-2 transition-all duration-300"
          >
            {loading ? "Creating..." : "Create Concert"}
          </button>
        </div>
      </form>
    </div>
  );
}
