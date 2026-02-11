import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const RightPanel = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="w-72 bg-white p-6 shadow-lg rounded-l-3xl hidden lg:block sticky top-0">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-200 rounded-full mx-auto mb-3"></div>
        <h2 className="font-semibold">{auth?.user?.name}</h2>
        <p className="text-sm text-gray-500">{auth?.user?.email}</p>
      </div>

      <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3 text-sm text-gray-600">
        <div className="bg-gray-100 p-3 rounded-lg">Sample Expense</div>
        <div className="bg-gray-100 p-3 rounded-lg">Sample Income</div>
        <div className="bg-gray-100 p-3 rounded-lg">Another Transaction</div>
      </div>
    </div>
  );
};

export default RightPanel;
