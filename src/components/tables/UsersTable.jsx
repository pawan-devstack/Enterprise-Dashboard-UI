import { useSelector } from "react-redux";

function UsersTable({
  users,
  onEdit,
  onDelete,
}) {

  const { darkMode } = useSelector(
    (state) => state.theme
  );

  return (
    <div
      className={`
        rounded-2xl shadow-md overflow-hidden
        border transition-all duration-300

        ${darkMode
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
        }
      `}
    >

      <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

          {/* Head */}
          <thead
            className={
              darkMode
                ? "bg-gray-800"
                : "bg-gray-100"
            }
          >

            <tr>

              <th
                className={`
                  text-left p-4

                  ${darkMode
                    ? "text-white"
                    : "text-black"
                  }
                `}
              >
                Name
              </th>

              <th
                className={`
                  text-left p-4

                  ${darkMode
                    ? "text-white"
                    : "text-black"
                  }
                `}
              >
                Email
              </th>

              <th
                className={`
                  text-left p-4

                  ${darkMode
                    ? "text-white"
                    : "text-black"
                  }
                `}
              >
                Company
              </th>

              <th
                className={`text-left p-4 ${darkMode
                  ? "text-white"
                  : "text-black"
                  }`}
              >
                Actions
              </th>

            </tr>

          </thead>

          {/* Body */}
          <tbody>

            {users.map((user) => (
              <tr
                key={user.id}
                className={`
                  border-t transition-all

                  ${darkMode
                    ? `
                        border-gray-800
                        hover:bg-gray-800
                      `
                    : `
                        border-gray-200
                        hover:bg-gray-50
                      `
                  }
                `}
              >

                <td
                  className={`
                    p-4

                    ${darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                    }
                  `}
                >
                  {user.name}
                </td>

                <td
                  className={`
                    p-4

                    ${darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                    }
                  `}
                >
                  {user.email}
                </td>

                <td
                  className={`
                    p-4

                    ${darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                    }
                  `}
                >
                  {user.company.name}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() => onEdit(user)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-all duration-300"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-all duration-300"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UsersTable;