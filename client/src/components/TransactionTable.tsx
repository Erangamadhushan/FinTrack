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
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-8">
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
              <tr key={t._id} className="border-b hover:bg-gray-50">
                <td className="py-2 capitalize">{t.type}</td>
                <td>{t.category}</td>
                <td
                  className={`font-semibold ${
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
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
    </div>
  );
};

export default TransactionTable;
