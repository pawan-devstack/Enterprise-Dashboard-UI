import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useSelector } from "react-redux";

const data = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 300 },
  { month: "Mar", users: 500 },
  { month: "Apr", users: 700 },
  { month: "May", users: 600 },
  { month: "Jun", users: 900 },
];

function UsersAnalyticsChart() {

  const { darkMode } = useSelector(
    (state) => state.theme
  );

  return (
    <div
      className={`
        p-6 rounded-2xl shadow-md border
        transition-all duration-300

        ${
          darkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        }
      `}
    >

      {/* Heading */}
      <div className="mb-6">

        <h2
          className={`
            text-2xl font-bold

            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
          `}
        >
          User Analytics
        </h2>

        <p
          className={`
            mt-1

            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }
          `}
        >
          Monthly active users
        </p>

      </div>

      {/* Chart */}
      <div className="w-full h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={
                darkMode
                  ? "#374151"
                  : "#E5E7EB"
              }
            />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              tick={{
                fill: darkMode
                  ? "#D1D5DB"
                  : "#6B7280",
              }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y Axis */}
            <YAxis
              tick={{
                fill: darkMode
                  ? "#D1D5DB"
                  : "#6B7280",
              }}
              axisLine={false}
              tickLine={false}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{
                fill: darkMode
                  ? "#1F2937"
                  : "#F3F4F6",
              }}
              contentStyle={{
                backgroundColor: darkMode
                  ? "#111827"
                  : "#FFFFFF",

                border: darkMode
                  ? "1px solid #374151"
                  : "1px solid #E5E7EB",

                borderRadius: "12px",

                color: darkMode
                  ? "#FFFFFF"
                  : "#000000",
              }}

              labelStyle={{
                color: darkMode
                  ? "#FFFFFF"
                  : "#000000",
              }}
            />

            {/* Bars */}
            <Bar
              dataKey="users"
              fill={
                darkMode
                  ? "#3B82F6"
                  : "#2563EB"
              }
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default UsersAnalyticsChart;