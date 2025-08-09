"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Birthday = () => {
  const [birthDate, setBirthDate] = useState("");
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Loaded from localStorage:", parsedData); // 🔍 Debugging line
      setFormData(parsedData);
    } else {
      router.push("/Registration"); // Redirect if no registration data
    }
  }, [router]);

        const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData || !birthDate) {
    alert("Please enter your birth date.");
    return;
  }

  // Construct minimal payload
  const payload = {
    birthDate,
  };

  if (formData.phoneNumber) {
    payload.phoneNumber = formData.phoneNumber;
  } else if (formData.email) {
    payload.email = formData.email;
  }

  console.log("Sending to backend:", payload);

  try {
    const response =await axios.patch("http://localhost:8080/api/addBirthday", payload);
 // use 127.0.0.1 if still fails
    
    console.log("Backend response:", response.data);
    alert("✅ Registered successfully!");
    router.push("/OtpVerify"); // or home
  } catch (err) {
    console.error("Error during registration:", err);
    const errorMessage =
      err.response?.data?.message || err.message || "Registration failed";
    alert(`❌ ${errorMessage}`);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          What's your birthday?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            name="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            className="w-full p-2 border rounded text-sm"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded font-semibold text-sm hover:bg-blue-600"
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default Birthday;
