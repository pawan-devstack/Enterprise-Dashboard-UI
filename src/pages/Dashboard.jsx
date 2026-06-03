import { useEffect, useState, useMemo, useCallback } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatsCard from "../components/cards/StatsCard";
import UsersTable from "../components/tables/UsersTable";
import UsersAnalyticsChart from "../components/charts/UsersAnalyticsChart";
import SkeletonCard from "../components/ui/SkeletonCard";
import TableSkeleton from "../components/ui/TableSkeleton";
import EditUserModal from "../components/users/EditUserModal";
import API from "../services/api";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter(
      (user) => user.id !== id
    );

    setUsers(updatedUsers);
  };

  const handleSaveUser = () => {
    const updatedUsers = users.map((u) =>
      u.id === selectedUser.id ? selectedUser : u
    );

    setUsers(updatedUsers);
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Search Handler
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  // Fetch Users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await API.get("/users");

      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial API Call
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset Page on Search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Filter Users
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  // Pagination Logic
  const indexOfLastUser =
    currentPage * usersPerPage;

  const indexOfFirstUser =
    indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  // Total Users Count
  const totalUsers = useMemo(() => {
    return filteredUsers.length;
  }, [filteredUsers]);

  // Total Pages
  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage)
  );

  // Loading State
  if (loading) {
    return (
      <DashboardLayout>

        <div className="space-y-8">

          {/* Skeleton Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />

          </div>

          {/* Table Skeleton */}
          <TableSkeleton />

        </div>

      </DashboardLayout>
    );
  }

  // Error State
  if (error) {
    return (
      <DashboardLayout>

        <div className="flex items-center justify-center h-[70vh]">

          <h1 className="text-3xl font-bold text-red-500">
            {error}
          </h1>

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Heading */}
        <div>

          <h1 className="text-4xl font-bold">
            Dashboard Overview
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome to your enterprise dashboard
          </p>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <StatsCard
            title="Total Users"
            value={totalUsers}
          />

          <StatsCard
            title="Active Projects"
            value="24"
          />

          <StatsCard
            title="Revenue"
            value="$12,500"
          />

        </div>

        {/* Analytics Chart */}
        <UsersAnalyticsChart />

        {/* Search Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <h2 className="text-2xl font-bold">
            Users List
          </h2>

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={handleSearch}
            className="border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-[300px]"
          />

        </div>

        {/* Users Table */}
        {currentUsers.length > 0 ? (
          <UsersTable
            users={currentUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="bg-white p-10 rounded-2xl shadow-md text-center">

            <h2 className="text-2xl font-bold text-gray-500">
              No Users Found
            </h2>

          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>

        </div>
        <EditUserModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          handleSaveUser={handleSaveUser}
          updating={false}
          darkMode={false}
        />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;