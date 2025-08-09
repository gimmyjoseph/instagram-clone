"use client";

import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 w-full z-10">
      <nav className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <div>
          <span className="text-2xl font-bold text-gray-800">Instagram</span>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <div className="flex items-center gap-4">
          <i className="fas fa-home text-xl cursor-pointer"></i>
          <i className="fab fa-facebook-messenger text-xl cursor-pointer"></i>
          <i className="far fa-compass text-xl cursor-pointer"></i>
          <i className="far fa-heart text-xl cursor-pointer"></i>
          <i
            className="fas fa-user-circle text-2xl cursor-pointer text-gray-600"
            onClick={() => alert("Profile menu toggled!")}
          ></i>
        </div>
      </nav>
    </header>
  );
}
