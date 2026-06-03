function UsersHeader({
  darkMode,
  totalUsers,
}) {
  return (
    <div>
      <h1
        className={`text-4xl font-bold ${
          darkMode
            ? "text-white"
            : "text-black"
        }`}
      >
        Users Management
      </h1>

      <p
        className={`mt-2 ${
          darkMode
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      >
        Manage and monitor all users
      </p>

      <p
        className={`text-sm ${
          darkMode
            ? "text-gray-500"
            : "text-gray-600"
        }`}
      >
        Total Users: {totalUsers}
      </p>
    </div>
  );
}

export default UsersHeader;