"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Logout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Perform the logout action and then redirect the user
    const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        // Always redirect, even if logout has a soft failure
        router.push('/login'); // Redirect to the login page
      }
    };
    handleLogout();
  }, [logout, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <FontAwesomeIcon icon={faSpinner} className="text-blue-500 text-3xl animate-spin" />
      <h1 className="mt-4 text-xl font-semibold">Signing Out...</h1>
      <p className="mt-2 text-sm text-gray-600">You will be redirected shortly.</p>
    </div>
  );
};

export default Logout;
