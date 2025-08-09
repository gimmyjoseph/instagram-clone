"use client";

export default function Footer() {
  return (
    <footer className="text-center py-6 text-gray-500">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center gap-4 mb-2">
          <a href="#" className="text-gray-500 hover:underline">About</a>
          <a href="#" className="text-gray-500 hover:underline">Help</a>
          <a href="#" className="text-gray-500 hover:underline">Privacy</a>
          <a href="#" className="text-gray-500 hover:underline">Terms</a>
        </div>
        <p>&copy; 2025 Instagram Clone</p>
      </div>
    </footer>
  );
}