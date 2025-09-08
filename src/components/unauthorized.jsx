import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <svg
        className="h-20 w-20 text-red-500 mb-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
        ></circle>
        <line
          x1="15"
          y1="9"
          x2="9"
          y2="15"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="9"
          y1="9"
          x2="15"
          y2="15"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <h1 className="text-2xl font-bold text-gray-800">403 - Unauthorized</h1>
      <p className="text-gray-600 mt-2">
        Anda tidak memiliki akses ke halaman ini.
      </p>
      <a
        href="/"
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
}
