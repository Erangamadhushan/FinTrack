import { useState } from "react";

interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
}

interface Props {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: Props) => {
  const [showModel, setShowModel] = useState<boolean>(false);
  const [activeTransaction, setActiveTransaction] = useState<Transaction | null>(null);

  const handleRowClick = (transaction: Transaction) => {
    setActiveTransaction(transaction);
    setShowModel(true);
  };
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-2xl shadow-md mt-8">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t._id}
                className="border-b hover:bg-gray-50 hover:text-purple-500 transition p-1 cursor-pointer"
                onClick={() => handleRowClick(t)}
              >
                <td className="p-2 capitalize">{t.type}</td>
                <td>{t.category}</td>
                <td
                  className={`font-semibold ${
                    t.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Rs. {t.amount}
                </td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {showModel && activeTransaction && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-60 z-10 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-2xl w-96">
            <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
            <p>
              <strong>Type:</strong> {activeTransaction.type}
            </p>
            <p>
              <strong>Category:</strong> {activeTransaction.category}
            </p>
            <p>
              <strong>Amount:</strong> Rs. {activeTransaction.amount}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(activeTransaction.date).toLocaleString()}
            </p>
            <button
              onClick={() => setShowModel(false)}
              className="mt-4 text-sm text-gray-700 bg-purple-300 hover:bg-purple-500 p-1 px-2 hover:text-white rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
