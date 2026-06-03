import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    const savedUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    if (!savedUser) {
      return toast.error(
        "Please create an account first"
      );
    }

    if (
      savedUser.email !== formData.email ||
      savedUser.password !== formData.password
    ) {
      return toast.error(
        "Invalid email or password"
      );
    }

    dispatch(login(savedUser));

    localStorage.setItem(
      "user",
      JSON.stringify(savedUser)
    );

    toast.success("Login Successful");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

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

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;