// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <nav className="w-48 bg-white border-r fixed top-0 left-0 h-screen p-4">
//       <h1 className="text-xl font-bold mb-4">InstaClone</h1>
//       <ul className="space-y-2">
//         <li>
//           <Link
//             href="/"
//             className={pathname === "/" ? "text-blue-500 font-bold" : "text-gray-600"}
//           >
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/features/search"
//             className={pathname === "/features/search" ? "text-blue-500 font-bold" : "text-gray-600"}
//           >
//             Search
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/features/message"
//             className={pathname === "/features/message" ? "text-blue-500 font-bold" : "text-gray-600"}
//           >
//             Message
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/features/notification"
//             className={pathname === "/features/notification" ? "text-blue-500 font-bold" : "text-gray-600"}
//           >
//             Notification
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/features/create"
//             className={pathname === "/features/create" ? "text-blue-500 font-bold" : "text-gray-600"}
//           >
//             Create
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/features/profile"
//             className={pathname === "/features/profile" ? "text-blue-500 font-bold" : "text-gray-600"}
//           >
//             Profile
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/features/settings"
//             className={pathname === "/features/settings" ? "text-blue-500 font-bold" : "text-gray-600"}
//           >
//             Settings
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/features/logout"
//             className={pathname === "/features/logout" ? "text-blue-500 font-bold" : "text-gray-600"}
//           >
//             Logout
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  MessageCircle,
  Bell,
  PlusSquare,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/dashboard/homefeed", icon: <Home size={20} /> },
    { name: "Search", href: "/features/search", icon: <Search size={20} /> },
    { name: "Messages", href: "/features/message", icon: <MessageCircle size={20} /> },
    { name: "Notifications", href: "/features/notification", icon: <Bell size={20} /> },
    { name: "Create", href: "/features/post", icon: <PlusSquare size={20} /> },
    { name: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
    { name: "Settings", href: "/features/settings", icon: <Settings size={20} /> },
    { name: "Logout", href: "/features/logout", icon: <LogOut size={20} /> },
  ];

  return (
    <nav style={{ width: "200px", padding: "16px", borderRight: "1px solid #ddd", height: "100vh" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>InstaClone</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {links.map((link) => (
          <li key={link.name} style={{ marginBottom: "12px" }}>
            <Link
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                color: pathname === link.href ? "blue" : "gray",
                fontWeight: pathname === link.href ? "bold" : "normal",
              }}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
