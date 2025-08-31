"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      setMessage("Please upload an image");
      return;
    }
    setMessage(""); 
    setLoading(true); // ✅ start loading

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    });
    formData.append("image", data.image[0]);

    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      setMessage(result.message || result.error);
    } catch (err) {
      setMessage("Something went wrong!");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Add School</h2>

        {/* School Name */}
        <input
          placeholder="School Name"
          {...register("name", { required: "School name is required" })}
          className="border p-2 w-full rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Address */}
        <input
          placeholder="Address"
          {...register("address", { required: "Address is required" })}
          className="border p-2 w-full rounded"
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}

        {/* City */}
        <input
          placeholder="City"
          {...register("city", { required: "City is required" })}
          className="border p-2 w-full rounded"
        />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}

        {/* State */}
        <input
          placeholder="State"
          {...register("state", { required: "State is required" })}
          className="border p-2 w-full rounded"
        />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}

        {/* Contact */}
        <input
          type="number"
          placeholder="Contact"
          {...register("contact", {
            required: "Contact number is required",
            minLength: { value: 10, message: "Must be at least 10 digits" },
            maxLength: { value: 15, message: "Must not exceed 15 digits" },
          })}
          className="border p-2 w-full rounded"
        />
        {errors.contact && (
          <p className="text-red-500">{errors.contact.message}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email_id", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
          })}
          className="border p-2 w-full rounded"
        />
        {errors.email_id && (
          <p className="text-red-500">{errors.email_id.message}</p>
        )}

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          {...register("image", {
            validate: (files) => files?.length > 0 || "Please upload an image",
          })}
          className="w-full cursor-pointer"
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 flex justify-center items-center cursor-pointer text-white w-full py-2 rounded disabled:opacity-70"
          disabled={loading} // ✅ disable button while loading
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Submit"
          )}
        </button>

        {/* Message */}
        {message && <p className="text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
}
