import CustomModal from "../ui/CustomModal";

function AddUserModal({ isOpen, onClose, newUser, setNewUser, handleAddUser, saving, darkMode }) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New User"
    >
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={newUser.name}
          onChange={(e) =>
            setNewUser({
              ...newUser,
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
          placeholder="Email"
          value={newUser.email}
          onChange={(e) =>
            setNewUser({
              ...newUser,
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

        <input
          type="text"
          placeholder="Company Name"
          value={newUser.company.name}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              company: {
                ...newUser.company,
                name: e.target.value,
              },
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
          onClick={handleAddUser}
          disabled={saving}
          className="
            w-full
            bg-green-600
            hover:bg-green-700
            text-white
            py-3
            rounded-lg
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {saving ? "Creating..." : "Create User"}
        </button>
      </div>
    </CustomModal>
  );
}

export default AddUserModal;