function UsersSearch({ search, handleSearch, onAddUser, darkMode }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={handleSearch}
        className={`
          px-4 py-3 rounded-xl
          border outline-none
          w-full md:w-[320px]

          ${darkMode
            ? `
                bg-gray-900
                border-gray-700
                text-white
                placeholder:text-gray-400
              `
            : `
                bg-white
                border-gray-300
                text-black
              `
          }
        `}
      />

      <button
        onClick={onAddUser}
        className="
          bg-green-600
          hover:bg-green-700
          text-white
          px-5 py-3
          rounded-xl
          whitespace-nowrap
          transition-all duration-300
        "
      >
        + Add User
      </button>
    </div>
  );
}

export default UsersSearch;