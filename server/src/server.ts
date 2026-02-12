import app from './app';
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import transactionRoutes from "./routes/transaction.routes";
import userRoutes from "./routes/user.routes";
import reportRoutes from "./routes/report.routes";


connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});