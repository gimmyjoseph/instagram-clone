"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import Sidebar from "@/components/shared/Sidebar";
import Footer from "@/components/shared/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide Sidebar on login & signup pages
  const hideSidebar = pathname === "/" || pathname === "/signup";

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <UserProvider>
            <div className="flex min-h-screen">
              {!hideSidebar && <Sidebar />}
              <main className="flex-1 p-4">{children}</main>
            </div>
            <Footer />
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
