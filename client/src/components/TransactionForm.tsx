import { useForm } from "react-hook-form";
import api from "../api/axios";

interface FormData {
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
}

interface Props {
  onSuccess: () => void;
}

const TransactionForm = ({ onSuccess }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await api.post("/transactions", data);
    reset();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <select
        {...register("type")}
        className="w-full p-2 border rounded-lg"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="number"
        placeholder="Amount"
        {...register("amount")}
        className="w-full p-2 border rounded-lg"
      />

      <input
        type="text"
        placeholder="Category"
        {...register("category")}
        className="w-full p-2 border rounded-lg"
      />

      <input
        type="date"
        {...register("date")}
        className="w-full p-2 border rounded-lg"
      />

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
