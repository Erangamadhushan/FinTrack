import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { SunIcon, MoonIcon } from "lucide-react";

const Sidebar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  const logout = () => {
    auth?.logout();
    navigate("/login");
  };

  return (
    <div className="w-64 dark:bg-slate-800 bg-purple-700 text-white flex flex-col p-6 rounded-r-3xl shadow-xl">
      <h1 className="text-2xl font-bold mb-10 flex justify-between items-center">
        <span>FinTrack</span>
        <button
          onClick={theme?.toggleTheme}
          className="ml-2 text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
        >
          {theme?.darkMode ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
        </button>
      </h1>

      <nav className="flex flex-col gap-4 text-sm">
        <button
          onClick={() => navigate("/")}
          className="text-left hover:bg-purple-600 p-2 rounded-lg"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="text-left hover:bg-purple-600 p-2 rounded-lg"
        >
          Profile
        </button>
        <button
          onClick={() => navigate("/transactions")}
          className="text-left hover:bg-purple-600 p-2 rounded-lg"
        >
          Transactions
        </button>
        <button
          onClick={() => navigate("/reports")}
          className="text-left hover:bg-purple-600 p-2 rounded-lg"
        >
          Reports
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="text-left hover:bg-purple-600 p-2 rounded-lg"
        >
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
