import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "../api/axios";

interface ChartData {
  name: string;
  income: number;
  expense: number;
}

interface Props {
  data: ChartData[];
}

interface CategoryData {
  _id: string;
  total: number;
}

const ActivityChart = ({ data }: Props) => {
  const [categorySummary, setCategorySummary] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/reports/category-breakdown");
      setCategorySummary(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-2xl shadow-md my-3">
        <h2 className="text-lg font-semibold mb-6">Monthly Activity</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4ffe88" />
            <Bar dataKey="expense" fill="#f87179" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-2xl shadow-md my-3">
        <h2 className="text-lg font-semibold mt-8 mb-4">Expense Breakdown</h2>

        {categorySummary.length === 0 ? (
          <p className="text-gray-500">No expense data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={categorySummary}
                dataKey="total"
                nameKey="_id"
                outerRadius={150}
                label
              >
                {data.map((_, index) => (
                  <Cell key={index} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
};

export default ActivityChart;
