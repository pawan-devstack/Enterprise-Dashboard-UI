function UsersPagination({ currentPage, totalPages, setCurrentPage, darkMode }) {
  return (
    <div className="flex justify-center items-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4 py-2
          rounded-lg
          disabled:bg-gray-400
        "
      >
        Prev
      </button>

      <span
        className={
          darkMode
            ? "text-white font-semibold"
            : "text-black font-semibold"
        }
      >
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4 py-2
          rounded-lg
          disabled:bg-gray-400
        "
      >
        Next
      </button>
    </div>
  );
}

export default UsersPagination;