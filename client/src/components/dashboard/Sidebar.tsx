import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    auth?.logout();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-purple-700 text-white flex flex-col p-6 rounded-r-3xl shadow-xl">
      <h1 className="text-2xl font-bold mb-10">FinTrack</h1>

      <nav className="flex flex-col gap-4 text-sm">
        <button className="text-left hover:bg-purple-600 p-2 rounded-lg">
          Dashboard
        </button>
        <button className="text-left hover:bg-purple-600 p-2 rounded-lg">
          Transactions
        </button>
        <button className="text-left hover:bg-purple-600 p-2 rounded-lg">
          Reports
        </button>
        <button className="text-left hover:bg-purple-600 p-2 rounded-lg">
          Settings
        </button>
      </nav>

      <div className="mt-auto">
        <button
          onClick={logout}
          className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
