"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  // Fetch registrationData on mount
  useEffect(() => {
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
    } else {
      router.push("/Example"); // Redirect if no registration data
    }
  }, []);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  
  const handleSubmit = async () => {
  if (!otp || !formData) {
    alert("OTP or form data missing");
    return;
  }

  const payload = {
    otp: otp,
    
  };

  if (formData.phoneNumber) {
    payload.phoneNumber = formData.phoneNumber;
    try{
      const response=await axios.post("http://localhost/api/verify/phone/otp",payload);
      console.log("verification of phoneOtp coompleted",response.data);
      router.push("/Example");
    }catch(error){
    console.error("Verification failed:", error);
    }
    
  } 
  else if (formData.email) {
    payload.email = formData.email;


    try {
    const response = await axios.post(
      "http://localhost:8080/api/verify/email/otp",
      payload
    );
    console.log("Verification success:", response.data);
    router.push("/Example"); // Redirect to next step after successful verification
  } catch (error) {
    console.error("Verification failed:", error);
  }
  }
  console.log("Payload being sent:", payload);


  try {
    const response = await axios.post(
      "http://localhost:8080/api/verify/email/otp",
      payload
    );
    console.log("Verification success:", response.data);
    router.push("/Example"); // Redirect to next step after successful verification
  } catch (error) {
    console.error("Verification failed:", error);
  }
};

    const resendOtp=async()=>{
      try{
        const response=await axios.post("http:localhost:8080/api/resent",payload)
        console.log("otp resent successfull",response.data);
      }catch(error){
        console.log("unsuccessfull");
      }
    }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
      <input
        type="text"
        name="otp"
        value={otp}
        onChange={handleChange}
        placeholder="Enter OTP"
        className="border border-gray-300 p-2 rounded mb-4 w-full max-w-xs"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default OtpVerification;
