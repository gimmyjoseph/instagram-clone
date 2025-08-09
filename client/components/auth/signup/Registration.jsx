"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Registration = () => {
  const [formData, setForm] = useState({
    email: "",
    phoneNumber: "",
    userName: "",
    fullName: "",
    password: "",
  });
  const router=useRouter();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email && !formData.phoneNumber) {
      alert("Please enter either an email or phone number.");
      return;
    }
    localStorage.setItem("registrationData", JSON.stringify(formData));

  

    try {
      const res = await axios.post("http://localhost:8080/api/register", formData);
      alert("\u2705 Registered successfully!");
      // ✅ Navigate to birthday page
    router.push("/Birthday");
    } catch (err) {
      alert(`\u274C ${err.response?.data || "Registration failed"}`);
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
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={onChange}
            className="w-full p-2 border rounded text-sm"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number (optional)"
            value={formData.phoneNumber}
            onChange={onChange}
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
          Have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
