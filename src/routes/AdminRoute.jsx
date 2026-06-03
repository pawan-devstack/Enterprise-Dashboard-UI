import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

function AdminRoute() {
  const { user } = useSelector(
    (state) => state.auth
  );

  return user?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" />
  );
}

export default AdminRoute;