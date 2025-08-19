"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Registration = () => {
  const [formData, setForm] = useState({
    contact: "", // single field for email or phone
    userName: "",
    fullName: "",
    password: "",
  });
  const router = useRouter();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.contact) {
      alert("Please enter an email or phone number.");
      return;
    }

    // Prepare payload
    const cleanedData = {
      userName: formData.userName,
      fullName: formData.fullName,
      password: formData.password,
    };

    // Detect if contact is email or phone
    if (/^\d+$/.test(formData.contact)) {
      cleanedData.phoneNumber = formData.contact;
      cleanedData.email = null;
    } else {
      cleanedData.email = formData.contact;
      cleanedData.phoneNumber = null;
    }

    localStorage.setItem("registrationData", JSON.stringify(cleanedData));

    try {
      const res = await axios.post("http://localhost:8080/api/register", cleanedData);
      alert("✅ Registered successfully!");
      router.push("/birthday");
    } catch (err) {
      if (err.response?.status === 409) {
        alert(`⚠️ Conflict: ${err.response?.data?.message || "User already exists"}`);
      } else if (err.response?.status === 400) {
        alert(`❌ Bad Request: ${err.response?.data?.message || "Invalid data"}`);
      } else {
        alert(`❌ ${err.response?.data?.message || "Registration failed"}`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 font-sans">Instagram</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={onChange}
            required
            className="w-full p-2 border rounded text-sm"
          />
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={onChange}
            required
            className="w-full p-2 border rounded text-sm"
          />
          <input
            type="text"
            name="contact"
            placeholder="Email or Phone Number"
            value={formData.contact}
            onChange={onChange}
            required
            className="w-full p-2 border rounded text-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onChange}
            required
            className="w-full p-2 border rounded text-sm"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded font-semibold text-sm hover:bg-blue-600"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;