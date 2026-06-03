import { useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  const { darkMode } = useSelector((state) => state.theme);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`min-h-screen flex transition-all duration-300
      ${darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
        }`}
    >

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1">

        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;