import CustomModal from "../ui/CustomModal";

function EditUserModal({ isOpen, onClose, selectedUser, setSelectedUser, handleSaveUser, updating, darkMode }) {
  if (!selectedUser) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit User"
    >
      <div className="space-y-4">
        <input
          type="text"
          value={selectedUser.name}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              name: e.target.value,
            })
          }
          className={`
            w-full p-3 rounded-lg border
            ${darkMode
              ? `
                  bg-gray-800
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

        <input
          type="email"
          value={selectedUser.email}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              email: e.target.value,
            })
          }
          className={`
            w-full p-3 rounded-lg border
            ${darkMode
              ? `
                  bg-gray-800
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
          onClick={handleSaveUser}
          disabled={updating}
          className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-lg
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {updating ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </CustomModal>
  );
}

export default EditUserModal;