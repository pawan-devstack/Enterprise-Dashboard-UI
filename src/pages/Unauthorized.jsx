import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">

        <h1 className="text-5xl font-bold text-red-500 mb-4">
          403
        </h1>

        <h2 className="text-2xl font-bold mb-3">
          Unauthorized Access
        </h2>

        <p className="text-gray-500 mb-6">
          You do not have permission to view this page.
        </p>

        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Back to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default Unauthorized;