import { Link } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-blue-500/10 animate-ping absolute"></div>
        <div className="w-32 h-32 rounded-full bg-blue-500/20"></div>
        <h1 className="absolute inset-0 flex items-center justify-center text-6xl font-extrabold text-blue-600">
          404
        </h1>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>

    </div>
  );
}
