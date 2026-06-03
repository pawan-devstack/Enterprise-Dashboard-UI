import {
  LayoutDashboard,
  Users,
  Settings,
  User,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LayoutDashboard size={20} />,
  },

  {
    name: "Users",
    path: "/users",
    icon: <Users size={20} />,
  },

  {
    name: "Settings",
    path: "/settings",
    icon: <Settings size={20} />,
  },

  {
    name: "Profile",
    path: "/profile",
    icon: <User size={20} />,
  },
];

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {

  const { user } = useSelector(
    (state) => state.auth
  );

  const { darkMode } = useSelector(
    (state) => state.theme
  );

  // Role Based Menu
  const filteredMenuItems =
    menuItems.filter((item) => {

      if (user?.role === "admin") {
        return true;
      }

      return (
        item.name !== "Users" &&
        item.name !== "Settings"
      );
    });

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          w-64 min-h-screen
          border-r shadow-sm p-5
          transform transition-all duration-300

          ${
            darkMode
              ? `
                bg-gray-900
                border-gray-800
              `
              : `
                bg-white
                border-gray-200
              `
          }

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Top */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-2xl font-bold text-blue-600">
              Dashboard
            </h1>

            <p
              className={`
                text-sm mt-1

                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
              `}
            >
              {user?.role?.toUpperCase()} PANEL
            </p>

          </div>

          {/* Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X
              size={24}
              className={
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            />
          </button>

        </div>

        {/* Menu */}
        <nav className="space-y-3">

          {filteredMenuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                p-3 rounded-xl
                transition-all duration-300

                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? `
                      text-gray-300
                      hover:bg-gray-800
                    `
                    : `
                      text-gray-700
                      hover:bg-gray-100
                    `
                }
              `
              }
            >

              {item.icon}

              <span className="font-medium">
                {item.name}
              </span>

            </NavLink>
          ))}

        </nav>

      </aside>
    </>
  );
}

export default Sidebar;