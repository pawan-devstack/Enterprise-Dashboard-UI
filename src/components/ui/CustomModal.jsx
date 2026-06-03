import { X } from "lucide-react";
import { useSelector } from "react-redux";

function CustomModal({
  isOpen,
  onClose,
  title,
  children,
}) {
  const { darkMode } = useSelector(
    (state) => state.theme
  );

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        p-4
      "
    >

      <div
        className={`
          w-full max-w-md
          rounded-2xl shadow-xl
          border
          transition-all duration-300

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

        {/* Header */}
        <div
          className={`
            flex items-center justify-between
            p-5 border-b

            ${darkMode
              ? "border-gray-800"
              : "border-gray-200"
            }
          `}
        >

          <h2
            className={`
              text-xl font-bold

              ${darkMode
                ? "text-white"
                : "text-black"
              }
            `}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className={`
              p-2 rounded-lg transition-all

              ${darkMode
                ? `
                    text-gray-400
                    hover:bg-gray-800
                  `
                : `
                    text-gray-500
                    hover:bg-gray-100
                  `
              }
            `}
          >
            <X size={18} />
          </button>

        </div>

        {/* Body */}
        <div className="p-5">
          {children}
        </div>

      </div>

    </div>
  );
}

export default CustomModal;