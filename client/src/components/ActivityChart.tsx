import {
  BarChart,
  PieChart,
  Pie,
  Cell,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface ChartData {
  name: string;
  income: number;
  expense: number;
}

interface Props {
  data: ChartData[];
}

const ActivityChart = ({ data }: Props) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-6">Monthly Activity</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#4ade80" />
          <Bar dataKey="expense" fill="#f87171" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300} className="mt-6">
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
    </div>
  );
};

export default ActivityChart;
