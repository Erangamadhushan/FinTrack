import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layout/MainLayout";
import TopCards from "../components/dashboard/TopCards";
import ActivityChart from "../components/ActivityChart";
import TransactionTable from "../components/TransactionTable";
import TransactionForm from "../components/TransactionForm";

interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const Dashboard = () => {
  const [summary, setSummary] = useState<Summary>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await api.get("/transactions/summary");
      setSummary(res.data);
    };
    const fetchData = async () => {
      const summaryRes = await api.get("/transactions/summary");
      setSummary(summaryRes.data);

      const monthlyRes = await api.get("/transactions/monthly");
      const allRes = await api.get("/transactions");
      const profileRes = await api.get("/users/profile");
      setProfile(profileRes.data);

      setTransactions(allRes.data);

      const formatted: any = {};

      monthlyRes.data.forEach((item: any) => {
        const month = `${item._id.month}/${item._id.year}`;

        if (!formatted[month]) {
          formatted[month] = {
            name: month,
            income: 0,
            expense: 0,
          };
        }

        formatted[month][item._id.type] = item.total;
      });

      setChartData(Object.values(formatted));
    };

    fetchData();
    fetchSummary();
  }, []);

  return (
    <MainLayout>
      {profile && profile.monthlyBudget > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-md mb-8 dark:text-white">
          <h3 className="text-sm md:text-2xl font-bold">Monthly Budget</h3>
          <p className="text-xl font-semibold">
            {profile.currency} {profile.monthlyBudget}.00
          </p>
        </div>
      )}

      <TopCards
        income={summary.totalIncome}
        expense={summary.totalExpense}
        balance={summary.balance}
      />
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
        >
          + Add Transaction
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Activity Chart</h2>
        <ActivityChart data={chartData} />

        <TransactionTable transactions={transactions} />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-60 z-10 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96">
            <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

            <TransactionForm
              onSuccess={() => {
                setShowModal(false);
                fetchData();
              }}
            />

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;
