import { Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

import toast from "react-hot-toast";

function Profile() {

  const { darkMode } = useSelector(
    (state) => state.theme
  );

  const dispatch = useDispatch();
  const { user } = useSelector(
    (state) => state.auth
  );

  // Profile State
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    role: user?.role || "user",
    bio: user?.bio || "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        role: user.role || "user",
        bio: user.bio || "",
      });
    }
  }, [user]);

  // Handle Input Change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save Profile
  const handleSave = (e) => {
    e.preventDefault();

    dispatch(updateProfile(profile));

    localStorage.setItem(
      "user",
      JSON.stringify(profile)
    );

    toast.success(
      "Profile Updated Successfully"
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

              ${darkMode
                ? "text-white"
                : "text-black"
              }
            `}
          >
            My Profile
          </h1>

          <p
            className={`
              mt-2

              ${darkMode
                ? "text-gray-400"
                : "text-gray-500"
              }
            `}
          >
            Manage your profile information
          </p>

        </div>

        {/* Profile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Card */}
          <div
            className={`
              rounded-2xl shadow-md border p-8
              transition-all duration-300

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

            {/* Avatar */}
            <div className="flex flex-col items-center">

              <div
                className="
                  w-28 h-28 rounded-full
                  bg-blue-600
                  flex items-center justify-center
                  text-4xl font-bold text-white
                "
              >
                {profile.name.charAt(0)}
              </div>

              <h2
                className={`
                  text-2xl font-bold mt-5

                  ${darkMode
                    ? "text-white"
                    : "text-black"
                  }
                `}
              >
                {profile.name}
              </h2>

              <p
                className={`
                  mt-1 capitalize

                  ${darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                  }
                `}
              >
                {profile.role}
              </p>

            </div>

            {/* Info */}
            <div className="mt-8 space-y-5">

              {/* Email */}
              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-blue-600"
                />

                <span
                  className={
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }
                >
                  {profile.email}
                </span>

              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-blue-600"
                />

                <span
                  className={
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }
                >
                  {profile.phone}
                </span>

              </div>

              {/* Location */}
              <div className="flex items-center gap-3">

                <MapPin
                  size={18}
                  className="text-blue-600"
                />

                <span
                  className={
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }
                >
                  {profile.location}
                </span>

              </div>

              {/* Role */}
              <div className="flex items-center gap-3">

                <Briefcase
                  size={18}
                  className="text-blue-600"
                />

                <span
                  className={
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }
                >
                  {profile.role.toUpperCase()}
                </span>

              </div>

            </div>

          </div>

          {/* Right Form */}
          <div
            className={`
              lg:col-span-2
              rounded-2xl shadow-md border p-8
              transition-all duration-300

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

            <form
              onSubmit={handleSave}
              className="space-y-6"
            >

              {/* Name */}
              <div>

                <label
                  className={`
                    block mb-2 font-medium

                    ${darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                    }
                  `}
                >
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className={`
                    w-full px-4 py-3 rounded-xl
                    border outline-none
                    transition-all duration-300

                    ${darkMode
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

                    ${darkMode
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
                  value={profile.email}
                  onChange={handleChange}
                  className={`
                    w-full px-4 py-3 rounded-xl
                    border outline-none
                    transition-all duration-300

                    ${darkMode
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

              {/* Phone */}
              <div>

                <label
                  className={`
                    block mb-2 font-medium

                    ${darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                    }
                  `}
                >
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className={`
                    w-full px-4 py-3 rounded-xl
                    border outline-none
                    transition-all duration-300

                    ${darkMode
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

              {/* Bio */}
              <div>

                <label
                  className={`
                    block mb-2 font-medium

                    ${darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                    }
                  `}
                >
                  Bio
                </label>

                <textarea
                  rows="5"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className={`
                    w-full px-4 py-3 rounded-xl
                    border outline-none resize-none
                    transition-all duration-300

                    ${darkMode
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
                Save Profile
              </button>

            </form>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Profile;