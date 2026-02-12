import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../api/axios";
import TransactionTable from "../components/TransactionTable";
import TransactionForm from "../components/TransactionForm";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    };
    fetchTransactions();
  }, []);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          + Add Transaction
        </button>
      </div>

      <TransactionTable transactions={transactions} />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96">
            <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

            <TransactionForm
              onSuccess={() => {
                setShowModal(false);
                fetchTransactions();
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

export default Transactions;
