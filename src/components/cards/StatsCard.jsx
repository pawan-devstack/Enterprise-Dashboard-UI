import { useSelector } from "react-redux";

function StatsCard({ title, value }) {

  const { darkMode } = useSelector(
    (state) => state.theme
  );

  return (
    <div
      className={`
        p-6 rounded-2xl shadow-md
        border transition-all duration-300

        ${darkMode
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
        }
      `}
    >

      <h3
        className={`
          text-lg

          ${darkMode
            ? "text-gray-400"
            : "text-gray-500"
          }
        `}
      >
        {title}
      </h3>

      <p
        className={`
          text-3xl font-bold mt-2

          ${darkMode
            ? "text-white"
            : "text-black"
          }
        `}
      >
        {value}
      </p>

    </div>
  );
}

export default StatsCard;