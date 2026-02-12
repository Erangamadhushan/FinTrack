import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../api/axios";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

interface CategoryData {
  _id: string;
  total: number;
}

const Reports = () => {
  const [data, setData] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/reports/category-breakdown");
      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-6">
          Expense Breakdown by Category
        </h2>

        {data.length === 0 ? (
          <p className="text-gray-500">No expense data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
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
    </MainLayout>
  );
};

export default Reports;
