import { useState } from "react";

import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [role, setRole] = useState("user");

  const handleLogin = () => {
    const userData = {
      name: "Pawan",
      role,
    };

    dispatch(login(userData));

    toast.success(
      `${role.toUpperCase()} Login Successful`
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        {/* Role Select */}
        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-5"
        >
          <option value="user">
            User
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Login as {role}
        </button>

      </div>

    </div>
  );
}

export default Login;