import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Page Not Found</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 btn-gradient text-white text-lg font-semibold rounded-full transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default PageNotFound;