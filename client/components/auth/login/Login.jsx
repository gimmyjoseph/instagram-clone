


"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const { state: authState, signin, clearState } = useAuth();
  const { error, loading, success, isAuthenticated } = authState;
  const router = useRouter();

  // Clear form and auth state on mount
  useEffect(() => {
    clearState();
    setLocalError("");
    setIdentifier("");
    setPassword("");
  }, [clearState]);

  // Handle redirection only after successful login
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard/homefeed");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!identifier.trim()) {
      setLocalError("Phone number or Email is required");
      return;
    }
    if (!password.trim()) {
      setLocalError("Password is required");
      return;
    }

    setLocalError("");
    const result = await signin(identifier.trim(), password.trim());

    // Handle failed login
    if (result.status !== 200) {
      setLocalError(result.message || "Invalid credentials. Please try again.");
    }
  };

  // Reset form and error states
  const resetForm = () => {
    setIdentifier("");
    setPassword("");
    setLocalError("");
    clearState();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
        <img
          src="/logo.png"
          alt="Instagram logo"
          className="mx-auto h-12 mb-6"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={`w-full p-3 bg-white border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none ${
                localError || error ? "border-red-400" : "border-gray-300"
              } focus:border-blue-400`}
              placeholder="Phone number or Email"
              aria-invalid={localError || error ? "true" : "false"}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 bg-white border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none ${
                localError || error ? "border-red-400" : "border-gray-300"
              } focus:border-blue-400`}
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="text-gray-600"
              />
            </span>
          </div>

          {(localError || error) && (
            <p className="text-sm text-red-500 text-center">
              {localError || error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-500 text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                Signing In...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {(localError || error) && (
          <button
            onClick={resetForm}
            className="w-full mt-4 py-3 px-4 rounded-md text-blue-600 font-medium border border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        )}

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}