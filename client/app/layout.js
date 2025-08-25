

import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext"; // NEW: Added UserProvider
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <UserProvider>{children}</UserProvider>
        
        </AuthProvider>
      </body>
    </html>
  );
}