import { Menu, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { toggleTheme } from "../../features/theme/themeSlice";
import toast from "react-hot-toast";

function Navbar({ setSidebarOpen }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const { darkMode } = useSelector(
    (state) => state.theme
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <header
      className={`
        px-6 py-4
        flex items-center justify-between
        border-b transition-all duration-300

        ${darkMode
          ? `
              bg-gray-900
              border-gray-800
            `
          : `
              bg-white
              border-gray-200
            `
        }
      `}
    >

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden"
        >
          <Menu
            size={28}
            className={
              darkMode
                ? "text-white"
                : "text-black"
            }
          />
        </button>

        <div>
          <div className="flex items-center gap-3">
            <h2
              className={`
        text-2xl font-bold
        ${darkMode ? "text-white" : "text-black"}
      `}
            >
              {user?.role === "admin"
                ? "Admin Dashboard"
                : "User Dashboard"}
            </h2>

            <span
              className={`
                  text-xs px-3 py-1 rounded-full font-medium
                  ${user?.role === "admin"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
                }
      `}
            >
              {user?.role?.toUpperCase()}
            </span>
          </div>

          <p
            className={`
      text-sm mt-1
      ${darkMode
                ? "text-gray-400"
                : "text-gray-500"
              }
    `}
          >
            Welcome back, {user?.name}
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Theme Button */}
        <button
          onClick={() =>
            dispatch(toggleTheme())
          }
          className={`
            flex items-center gap-2
            px-4 py-2 rounded-lg
            transition-all duration-300

            ${darkMode
              ? `
                  bg-gray-800
                  text-white
                `
              : `
                  bg-gray-200
                  text-black
                `
            }
          `}
        >

          {darkMode ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}

          <span className="hidden md:block">
            Theme
          </span>

        </button>

        {/* Logout */}
        <button
          onClick={() => {
            dispatch(logout());
            toast.success("Logged Out");
            navigate("/login");
          }}
          className="
            bg-red-500 hover:bg-red-600
            text-white
            px-4 py-2 rounded-lg
            transition-all duration-300
          "
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;