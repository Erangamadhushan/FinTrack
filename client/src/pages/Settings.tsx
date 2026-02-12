import MainLayout from "../layout/MainLayout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const deleteAccount = () => {
    alert("Delete account feature can be implemented later.");
  };

  return (
    <MainLayout>
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-lg">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200"
          >
            Manage Profile
          </button>

          <button
            onClick={deleteAccount}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
          >
            Delete Account
          </button>

          <button
            onClick={() => {
              auth?.logout();
              navigate("/login");
            }}
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
          >
            Logout
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
