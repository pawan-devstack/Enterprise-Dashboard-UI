import { useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  const { darkMode } = useSelector((state) => state.theme);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`
      h-screen flex overflow-hidden
      transition-all duration-300
      ${darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
        }
    `}
    >
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;