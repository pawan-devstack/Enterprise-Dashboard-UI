import { useState } from "react";

import { useSelector } from "react-redux";

import DashboardLayout from "../components/layout/DashboardLayout";

import toast from "react-hot-toast";

function Settings() {

  const { darkMode } = useSelector(
    (state) => state.theme
  );

  // Settings State
  const [settings, setSettings] = useState({
    fullName: "Pawan Chourasiya",
    email: "pawan@example.com",
    notifications: true,
    autoUpdates: false,
  });

  // Handle Input Change
  const handleChange = (e) => {

    const { name, value, type, checked } =
      e.target;

    setSettings((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // Save Settings
  const handleSave = (e) => {
    e.preventDefault();

    toast.success(
      "Settings Updated Successfully"
    );
  };

  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}
        <div>

          <h1
            className={`
              text-4xl font-bold

              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            `}
          >
            Settings
          </h1>

          <p
            className={`
              mt-2

              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }
            `}
          >
            Manage your dashboard preferences
          </p>

        </div>

        {/* Settings Card */}
        <div
          className={`
            max-w-3xl
            p-8 rounded-2xl shadow-md border
            transition-all duration-300

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
          `}
        >

          <form
            onSubmit={handleSave}
            className="space-y-6"
          >

            {/* Full Name */}
            <div>

              <label
                className={`
                  block mb-2 font-medium

                  ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }
                `}
              >
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={settings.fullName}
                onChange={handleChange}
                className={`
                  w-full px-4 py-3 rounded-xl
                  border outline-none
                  transition-all duration-300

                  ${
                    darkMode
                      ? `
                        bg-gray-800
                        border-gray-700
                        text-white
                      `
                      : `
                        bg-white
                        border-gray-300
                        text-black
                      `
                  }
                `}
              />

            </div>

            {/* Email */}
            <div>

              <label
                className={`
                  block mb-2 font-medium

                  ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }
                `}
              >
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className={`
                  w-full px-4 py-3 rounded-xl
                  border outline-none
                  transition-all duration-300

                  ${
                    darkMode
                      ? `
                        bg-gray-800
                        border-gray-700
                        text-white
                      `
                      : `
                        bg-white
                        border-gray-300
                        text-black
                      `
                  }
                `}
              />

            </div>

            {/* Notification Toggle */}
            <div
              className={`
                flex items-center justify-between
                p-4 rounded-xl border

                ${
                  darkMode
                    ? `
                      bg-gray-800
                      border-gray-700
                    `
                    : `
                      bg-gray-50
                      border-gray-200
                    `
                }
              `}
            >

              <div>

                <h3
                  className={
                    darkMode
                      ? "text-white font-semibold"
                      : "text-black font-semibold"
                  }
                >
                  Notifications
                </h3>

                <p
                  className={
                    darkMode
                      ? "text-gray-400 text-sm"
                      : "text-gray-500 text-sm"
                  }
                >
                  Receive dashboard updates
                </p>

              </div>

              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="w-5 h-5"
              />

            </div>

            {/* Auto Updates */}
            <div
              className={`
                flex items-center justify-between
                p-4 rounded-xl border

                ${
                  darkMode
                    ? `
                      bg-gray-800
                      border-gray-700
                    `
                    : `
                      bg-gray-50
                      border-gray-200
                    `
                }
              `}
            >

              <div>

                <h3
                  className={
                    darkMode
                      ? "text-white font-semibold"
                      : "text-black font-semibold"
                  }
                >
                  Auto Updates
                </h3>

                <p
                  className={
                    darkMode
                      ? "text-gray-400 text-sm"
                      : "text-gray-500 text-sm"
                  }
                >
                  Enable automatic updates
                </p>

              </div>

              <input
                type="checkbox"
                name="autoUpdates"
                checked={settings.autoUpdates}
                onChange={handleChange}
                className="w-5 h-5"
              />

            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="
                bg-blue-600 hover:bg-blue-700
                text-white
                px-6 py-3 rounded-xl
                transition-all duration-300
              "
            >
              Save Settings
            </button>

          </form>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Settings;