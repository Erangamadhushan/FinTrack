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
    <div className="w-20 md:w-64 sticky top-0 dark:bg-gray-9 dark:text-white flex flex-col p-6 shadow-xl max-h-screen border-r-2 border-r-gray-500">
      <h1 className="text-2xl font-bold mb-10 flex justify-between items-center flex-col md:flex-row">
        <span className="hidden md:block dark:text-purple-600 p-2 rounded-lg cursor-pointer text-purple-400">FinTrack</span><span className="dark:text-purple-600 block md:hidden p-2 rounded-lg cursor-pointer text-purple-400">FT</span>
        <button
          onClick={theme?.toggleTheme}
          className="ml-2 text-sm bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded cursor-pointer"
        >
          {theme?.darkMode ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
        </button>
      </h1>

      <nav className="flex flex-col gap-4 text-sm">
        <button
          onClick={() => navigate("/")}
          className="text-left hover:bg-purple-600 p-2 rounded-lg cursor-pointer bg-purple-200 dark:bg-purple-900 flex gap-1"
        >
          <img src="./icons/dashboard.png" className="w-5 h-5"/><span className="hidden md:block">Dashboard</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="text-left hover:bg-purple-600 p-2 rounded-lg cursor-pointer bg-purple-200 dark:bg-purple-900 flex gap-1"
        >
          <img src="./icons/profile.png" className="w-5 h-5"/><span className="hidden md:block">Profile</span>
        </button>
        <button
          onClick={() => navigate("/transactions")}
          className="text-left hover:bg-purple-600 p-2 rounded-lg cursor-pointer bg-purple-200 dark:bg-purple-900 flex gap-1"
        >
          <img src="./icons/transactions.png" className="w-5 h-5"/><span className="hidden md:block">Transactions</span>
        </button>
        <button
          onClick={() => navigate("/reports")}
          className="text-left hover:bg-purple-600 p-2 rounded-lg cursor-pointer bg-purple-200 dark:bg-purple-900 flex gap-1"
        >
          <img src="./icons/reports.png" className="w-5 h-5"/><span className="hidden md:block">Reports</span>
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="text-left hover:bg-purple-600 p-2 rounded-lg cursor-pointer bg-purple-200 dark:bg-purple-900 flex gap-1"
        >
          <img src="./icons/settings.png" className="w-5 h-5"/><span className="hidden md:block">Settings</span>
        </button>
      </nav>

      <div className="mt-auto">
        <button
          onClick={logout}
          className="w-full bg-purple-500 py-2 rounded-lg text-white hover:bg-purple-700 transition cursor-pointer"
        >
          {
            window.innerWidth >= 768 ? "Logout" : <img src="./icons/logout.png" className="w-5 h-5 mx-auto"/>
          }
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
