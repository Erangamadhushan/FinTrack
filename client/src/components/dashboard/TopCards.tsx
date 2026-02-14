interface Props {
  income: number;
  expense: number;
  balance: number;
}

const TopCards = ({ income, expense, balance }: Props) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <h3 className="text-gray-500 dark:text-white text-sm md:text-lg">Total Income</h3>
        <p className="text-2xl font-bold text-green-600">Rs. {income}.00</p>
      </div>

      <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <h3 className="text-gray-500 dark:text-white text-sm md:text-lg">Total Expense</h3>
        <p className="text-2xl font-bold text-red-600">Rs. {expense}.00</p>
      </div>

      <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <h3 className="text-gray-500 dark:text-white text-sm md:text-lg">Balance</h3>
        <p
          className={`text-2xl font-bold ${
            balance >= 0 ? "text-purple-600" : "text-red-600"
          }`}
        >
          Rs. {balance}.00
        </p>
      </div>
    </div>
  );
};

export default TopCards;
