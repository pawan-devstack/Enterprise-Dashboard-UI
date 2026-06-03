import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <div className="max-w-lg w-full text-center">

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-blue-600">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-3xl font-bold text-slate-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-slate-500">
          Sorry, the page you are looking for doesn't exist
          or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6 py-3
              rounded-xl
              font-medium
              transition-all
              duration-300
              shadow-lg
            "
          >
            Go Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="
              border
              border-slate-300
              hover:bg-slate-200
              px-6 py-3
              rounded-xl
              font-medium
              transition-all
              duration-300
            "
          >
            Go Back
          </button>
        </div>

        {/* Decorative Card */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <p className="text-slate-600">
            The URL you entered is invalid or the page has been removed.
          </p>
        </div>

      </div>
    </div>
  );
}

export default NotFound;