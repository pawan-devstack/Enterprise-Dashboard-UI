import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return toast.error("All fields are required");
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match"
      );
    }

    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: formData.role,
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(userData)
    );

    toast.success("Account Created Successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Join the dashboard platform
        </p>

        <form onSubmit={handleSignup} className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword:
                  e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;