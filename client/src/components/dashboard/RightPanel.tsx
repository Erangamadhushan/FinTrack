import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axios";

interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
}

interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const RightPanel = () => {
  const auth = useContext(AuthContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const txRes = await api.get("/transactions");
      const sumRes = await api.get("/transactions/summary");

      setTransactions(txRes.data.slice(0, 5));
      setSummary(sumRes.data);
    };

    fetchData();
  }, []);

  return (
    <div className="w-72 bg-white p-6 shadow-lg hidden lg:block max-h-screen sticky top-0 dark:bg-gray-950 border-l-2 border-l-gray-500">
      {/* Profile */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-200 rounded-full mx-auto mb-3">
          <img src="icons/profile.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
        </div>
        <h2 className="font-semibold">{auth?.user?.name}</h2>
        <p className="text-sm text-gray-500">{auth?.user?.email}</p>
      </div>

      {/* Balance */}
      {summary && (
        <div className="bg-purple-50 p-4 rounded-xl mb-6">
          <p className="text-sm text-gray-500">Current Balance</p>
          <p className="text-xl font-bold text-purple-700">
            Rs. {summary.balance}
          </p>
        </div>
      )}

      {/* Recent Activity */}
      <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>

      <div className="space-y-3 text-sm">
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          transactions.map((t) => (
            <div
              key={t._id}
              className="bg-gray-50 p-3 rounded-lg flex justify-between"
            >
              <span>{t.category}</span>
              <span
                className={`font-semibold ${
                  t.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {t.type === "income" ? "+" : "-"} Rs. {t.amount}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RightPanel;
