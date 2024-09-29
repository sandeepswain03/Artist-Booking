"use client";
import { useState, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "@/components/svgIcons";
import { Upload } from "@/components/svgIcons";
const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const MAX_IMAGES = 3;
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    avatars: [] as File[],
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
    bio: "",
    videoLink1: "",
    videoLink2: "",
    videoLink3: "",
    socialLink1: "",
    socialLink2: "",
    socialLink3: "",
    socialLink4: "",
    socialLink5: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordShow, setPasswordShow] = useState(false);
  const [avatarPreviews, setAvatarPreviews] = useState<string[]>([]);
  const [totalImageSize, setTotalImageSize] = useState(0);
  const router = useRouter();
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const newTotalSize = formData.avatars.reduce(
      (acc, file) => acc + file.size,
      0
    );
    setTotalImageSize(newTotalSize);
  }, [formData.avatars]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error for this field when it's changed
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newTotalSize =
      fileArray.reduce((acc, file) => acc + file.size, 0) + totalImageSize;
    const totalImages = formData.avatars.length + fileArray.length;

    const maxImages = formData.role === "user" ? 1 : MAX_IMAGES;

    if (totalImages > maxImages) {
      setAlert({
        type: "error",
        message: `You can only upload a maximum of ${maxImages} image${
          maxImages > 1 ? "s" : ""
        }.`,
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
      avatars: [...prev.avatars, ...fileArray],
    }));
    setAvatarPreviews((prev) => [
      ...prev,
      ...fileArray.map((file) => URL.createObjectURL(file)),
    ]);

    // Clear the avatar error when a file is selected
    setErrors((prev) => ({ ...prev, avatars: "" }));
  };

  const removeAvatar = (index: number) => {
    setFormData((prev) => {
      const newAvatars = [...prev.avatars];
      newAvatars.splice(index, 1);
      return { ...prev, avatars: newAvatars };
    });

    setAvatarPreviews((prev) => {
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
    setErrors({});

    const {
      username,
      email,
      password,
      role,
      bio,
      avatars,
      videoLink1,
      videoLink2,
      videoLink3,
      socialLink1,
      socialLink2,
      socialLink3,
      socialLink4,
      socialLink5,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    } = formData;

    let newErrors: { [key: string]: string } = {};

    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!role) newErrors.role = "Role is required";
    if (role === "artist") {
      if (!bio) newErrors.bio = "Bio is required for artists";
      if (!videoLink1)
        newErrors.videoLink1 =
          "At least one video link is required for artists";
      if (!city) newErrors.city = "City is required for artists";
      if (!state) newErrors.state = "State is required for artists";
      if (!country) newErrors.country = "Country is required for artists";
      if (!pincode) newErrors.pincode = "Pincode is required for artists";
      if (!phoneNumber)
        newErrors.phoneNumber = "Phone Number is required for artists";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", username);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);
    formDataToSend.append("role", role);
    avatars.forEach((avatar, index) => {
      formDataToSend.append(`avatar${index + 1}`, avatar);
    });
    if (role === "artist") {
      formDataToSend.append("bio", bio);
      formDataToSend.append("videolink1", videoLink1);
      if (videoLink2) formDataToSend.append("videolink2", videoLink2);
      if (videoLink3) formDataToSend.append("videolink3", videoLink3);
      formDataToSend.append("socialLink1", socialLink1);
      formDataToSend.append("socialLink2", socialLink2);
      formDataToSend.append("socialLink3", socialLink3);
      formDataToSend.append("socialLink4", socialLink4);
      formDataToSend.append("socialLink5", socialLink5);
      formDataToSend.append("city", city);
      formDataToSend.append("state", state);
      formDataToSend.append("country", country);
      formDataToSend.append("pincode", pincode);
      formDataToSend.append("phoneNumber", phoneNumber);
    }

    try {
      const response = await axios.post("/api/user", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        router.replace(`/verify/${username}`);
      } else {
        setErrors({ general: response.data.message || "Something went wrong" });
      }
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error during sign-up:", error);
      if (
        error.response?.status === 400 &&
        error.response?.data &&
        typeof error.response.data === "object"
      ) {
        const responseData = error.response.data as { [key: string]: string };
        if (
          responseData.message &&
          responseData.message.includes("already exists")
        ) {
          setErrors({
            general: "User with this email or username already exists",
          });
        } else {
          if (responseData.username) {
            setErrors((prev) => ({ ...prev, username: responseData.username }));
          }
          if (responseData.email) {
            setErrors((prev) => ({ ...prev, email: responseData.email }));
          }
          if (responseData.avatar) {
            setErrors((prev) => ({ ...prev, avatars: responseData.avatar }));
          }
          setErrors((prev) => ({ ...prev, ...responseData }));
        }
      } else {
        setErrors({ general: "An error occurred during sign-up" });
      }
    }

    setLoading(false);
  };

  return (
    <div
      className={`flex justify-center items-center w-full min-h-screen p-4 ${
        formData.role === "user" ? "md:items-center" : ""
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full ${
          formData.role === "user" ? "md:max-w-md" : "max-w-4xl"
        }`}
      >
        <div className="bg-white px-6 sm:px-10 py-8 rounded-sm shadow-md w-full">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Create an account
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Sign up to get started
              </p>
            </div>
            <div
              className={`grid ${
                formData.role === "user" ? "md:grid-cols-1" : "md:grid-cols-2"
              } gap-6`}
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-gray-600 text-sm font-medium"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full rounded-sm border ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    } bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300`}
                    placeholder="Enter Username"
                  />
                  {errors.username && (
                    <p className="mt-1 text-red-500 text-xs">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-gray-600 text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-sm border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300`}
                    placeholder="Enter Email Address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-gray-600 text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    type={passwordShow ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full rounded-sm border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300`}
                    placeholder="Enter Password"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="absolute top-[38px] text-gray-500 right-3 cursor-pointer select-none"
                  >
                    {passwordShow ? <Eye /> : <EyeOff />}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-red-500 text-xs">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-gray-600 text-sm font-medium"
                  >
                    Role
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "role", value: "user" },
                        } as React.ChangeEvent<HTMLInputElement>)
                      }
                      className={`flex-1 py-2 px-4 rounded-sm text-sm font-medium transition-colors duration-200 ${
                        formData.role === "user"
                          ? "bg-[#CE1446] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      User
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "role", value: "artist" },
                        } as React.ChangeEvent<HTMLInputElement>)
                      }
                      className={`flex-1 py-2 px-4 rounded-sm text-sm font-medium transition-colors duration-200 ${
                        formData.role === "artist"
                          ? "bg-[#CE1446] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Artist
                    </button>
                  </div>
                  {errors.role && (
                    <p className="mt-1 text-red-500 text-xs">{errors.role}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-gray-600 text-sm font-medium">
                    Avatars
                  </label>
                  <div className="flex flex-col items-start gap-2">
                    <input
                      type="file"
                      id="avatars"
                      name="avatars"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple={formData.role === "artist"}
                      disabled={
                        formData.avatars.length >=
                        (formData.role === "user" ? 1 : MAX_IMAGES)
                      }
                    />
                    <label
                      htmlFor="avatars"
                      className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-sm border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 cursor-pointer ${
                        formData.avatars.length >=
                        (formData.role === "user" ? 1 : MAX_IMAGES)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <Upload />
                      Upload Images ({formData.avatars.length}/{MAX_IMAGES})
                    </label>
                    <p className="text-sm text-gray-500">
                      Total size: {(totalImageSize / 1024 / 1024).toFixed(2)} MB
                      / 5 MB
                    </p>
                    {avatarPreviews.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {avatarPreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                              <Image
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                width={100}
                                height={100}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAvatar(index)}
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
              </div>
              {formData.role === "artist" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="block mb-2 text-gray-600 text-sm font-medium"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full rounded-sm border ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        } bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300`}
                        placeholder="Enter your city"
                      />
                      {errors.city && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block mb-2 text-gray-600 text-sm font-medium"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full rounded-sm border ${
                          errors.state ? "border-red-500" : "border-gray-300"
                        } bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300`}
                        placeholder="Enter your state"
                      />
                      {errors.state && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.state}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block mb-2 text-gray-600 text-sm font-medium"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full rounded-sm border ${
                          errors.country ? "border-red-500" : "border-gray-300"
                        } bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300`}
                        placeholder="Enter your country"
                      />
                      {errors.country && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.country}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="pincode"
                        className="block mb-2 text-gray-600 text-sm font-medium"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className={`w-full rounded-sm border ${
                          errors.pincode ? "border-red-500" : "border-gray-300"
                        } bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300`}
                        placeholder="Enter your pincode"
                      />
                      {errors.pincode && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full rounded-sm border ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      } bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-red-500 text-xs">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="bio"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className={`w-full rounded-sm border ${
                        errors.bio ? "border-red-500" : "border-gray-300"
                      } bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300`}
                      placeholder="Enter your bio"
                    />
                    {errors.bio && (
                      <p className="mt-1 text-red-500 text-xs">{errors.bio}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="videoLink1"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Video Link 1
                    </label>
                    <input
                      type="url"
                      id="videoLink1"
                      name="videoLink1"
                      value={formData.videoLink1}
                      onChange={handleChange}
                      className={`w-full rounded-sm border ${
                        errors.videoLink1 ? "border-red-500" : "border-gray-300"
                      } bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300`}
                      placeholder="Enter video link"
                    />
                    {errors.videoLink1 && (
                      <p className="mt-1 text-red-500 text-xs">
                        {errors.videoLink1}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="videoLink2"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Video Link 2
                    </label>
                    <input
                      type="url"
                      id="videoLink2"
                      name="videoLink2"
                      value={formData.videoLink2}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                      placeholder="Enter video link (optional)"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="videoLink3"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Video Link 3
                    </label>
                    <input
                      type="url"
                      id="videoLink3"
                      name="videoLink3"
                      value={formData.videoLink3}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                      placeholder="Enter video link (optional)"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="socialLink1"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Instagram
                    </label>
                    <div className="relative">
                      <FaInstagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="url"
                        id="socialLink1"
                        name="socialLink1"
                        value={formData.socialLink1}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-gray-300 bg-transparent py-2 pl-10 pr-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                        placeholder="Enter Instagram link"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="socialLink2"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Twitter
                    </label>
                    <div className="relative">
                      <FaTwitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="url"
                        id="socialLink2"
                        name="socialLink2"
                        value={formData.socialLink2}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-gray-300 bg-transparent py-2 pl-10 pr-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                        placeholder="Enter Twitter link"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="socialLink3"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      YouTube
                    </label>
                    <div className="relative">
                      <FaYoutube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="url"
                        id="socialLink3"
                        name="socialLink3"
                        value={formData.socialLink3}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-gray-300 bg-transparent py-2 pl-10 pr-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                        placeholder="Enter YouTube link"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="socialLink4"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Facebook
                    </label>
                    <div className="relative">
                      <FaFacebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="url"
                        id="socialLink4"
                        name="socialLink4"
                        value={formData.socialLink4}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-gray-300 bg-transparent py-2 pl-10 pr-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                        placeholder="Enter Facebook link"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="socialLink5"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      TikTok
                    </label>
                    <div className="relative">
                      <FaTiktok className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="url"
                        id="socialLink5"
                        name="socialLink5"
                        value={formData.socialLink5}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-gray-300 bg-transparent py-2 pl-10 pr-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                        placeholder="Enter TikTok link"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {errors && (
            <div className="mt-4 text-red-500 text-sm">{errors.general}</div>
          )}
          <button
            type="submit"
            className="mt-6 w-full bg-[#CE1446] text-white py-2 px-4 rounded-sm text-sm sm:text-base font-medium tracking-wide hover:bg-[#B01238] transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <div className="mt-6 text-sm text-center">
            Already have an account?
            <Link
              href="/sign-in"
              className="font-medium text-[#CE1446] hover:underline ml-1"
            >
              login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
