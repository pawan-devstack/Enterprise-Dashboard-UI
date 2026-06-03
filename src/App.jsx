import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>

        {/* Common Routes */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>

          <Route
            path="/users"
            element={<Users />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;