import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { validateUser } from "../utils/userValidation";
import { saveUsersToStorage, getUsersFromStorage } from "../utils/userStorage";
import DashboardLayout from "../components/layout/DashboardLayout";
import UsersTable from "../components/tables/UsersTable";
import TableSkeleton from "../components/ui/TableSkeleton";
import AddUserModal from "../components/users/AddUserModal";
import EditUserModal from "../components/users/EditUserModal";
import UsersSearch from "../components/users/UsersSearch";
import UsersPagination from "../components/users/UsersPagination";
import UsersHeader from "../components/users/UsersHeader";
import API from "../services/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function Users() {
  const { darkMode } = useSelector((state) => state.theme);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);
  const searchTerm = search.trim().toLowerCase();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    company: {
      name: "",
    },
  });

  const usersPerPage = 5;

  const handleAddUser = () => {
    try {
      setSaving(true);

      const validationError = validateUser(
        newUser.name,
        newUser.email,
        users
      );

      if (validationError) {
        toast.error(validationError);
        return;
      }

      const user = {
        id: Date.now(),
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        company: {
          name: newUser.company.name.trim() || "New Company",
        },
      };

      const updatedUsers = [user, ...users];

      setUsers(updatedUsers);
      saveUsersToStorage(updatedUsers);

      closeAddModal();

      toast.success("User Added Successfully");
    } finally {
      setSaving(false);
    }
  };

  // Search Handler
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  // Fetch Users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      const storedUsers = getUsersFromStorage();

      if (storedUsers) {
        setUsers(storedUsers);
        return;
      }

      const response = await API.get("/users");

      const normalizedUsers = Array.isArray(response.data)
        ? response.data.map((user) => ({
          ...user,
          name: user.name || "Unknown User",
          email: user.email || "No Email",
          company: user.company || { name: "N/A" },
        }))
        : [];

      setUsers(normalizedUsers);

      saveUsersToStorage(normalizedUsers);

      setError("");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Edit User
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Delete User
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Delete User?",
        text: "This action cannot be undone",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      const updatedUsers = users.filter(
        (user) => user.id !== id
      );

      setUsers(updatedUsers);
      saveUsersToStorage(updatedUsers);

      toast.success("User Deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  // Save User
  const handleSaveUser = () => {
    if (!selectedUser) return;

    try {
      setUpdating(true);

      const validationError = validateUser(
        selectedUser.name,
        selectedUser.email,
        users,
        selectedUser.id
      );

      if (validationError) {
        toast.error(validationError);
        return;
      }

      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
          ? {
            ...selectedUser,
            name: selectedUser.name.trim(),
            email: selectedUser.email.trim(),
          }
          : user
      );

      setUsers(updatedUsers);

      saveUsersToStorage(updatedUsers);

      closeEditModal();

      toast.success("User Updated");
    } finally {
      setUpdating(false);
    }
  };

  // Filter Users
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        (user.name || "")
          .toLowerCase()
          .includes(searchTerm) ||
        (user.email || "")
          .toLowerCase()
          .includes(searchTerm)
    );
  }, [users, searchTerm]);

  const closeAddModal = () => {
    setNewUser({
      name: "",
      email: "",
      company: {
        name: "",
      },
    });

    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;

  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage),
  );
  useEffect(() => {
    if (currentPage > totalPages && currentPage > 1) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Loading
  if (loading) {
    return (
      <DashboardLayout>
        <TableSkeleton />
      </DashboardLayout>
    );
  }

  // Error
  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-red-500 text-3xl font-bold">{error}</h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}

        <UsersHeader
          darkMode={darkMode}
          totalUsers={filteredUsers.length}
        />

        <UsersSearch
          search={search}
          handleSearch={handleSearch}
          darkMode={darkMode}
          onAddUser={() => setIsAddModalOpen(true)}
        />

        {/* Users Table */}
        {currentUsers.length > 0 ? (
          <UsersTable
            users={currentUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div
            className={`
              p-10 rounded-2xl shadow-md
              text-center border

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
            <h2 className="text-2xl font-bold text-gray-500">No Users Found</h2>
          </div>
        )}

        {/* Pagination */}

        {filteredUsers.length > usersPerPage && (
          <UsersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            darkMode={darkMode}
          />
        )}

        {/* Edit Modal */}
        <EditUserModal
          isOpen={isModalOpen}
          onClose={closeEditModal}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          handleSaveUser={handleSaveUser}
          updating={updating}
          darkMode={darkMode}
        />

        {/* Add Modal */}
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          newUser={newUser}
          setNewUser={setNewUser}
          handleAddUser={handleAddUser}
          saving={saving}
          darkMode={darkMode}
        />


      </div>
    </DashboardLayout>
  );
}

export default Users;
