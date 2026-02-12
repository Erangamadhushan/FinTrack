import { Router } from "express";
import { protect, AuthRequest } from "../middleware/auth.middleware";
import Transaction from "../models/transaction/Transaction.model";
import mongoose from "mongoose";

const router = Router();

// Get category breakdown for expenses
router.get("/category-breakdown", protect, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;

    const breakdown = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    res.json(breakdown);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch report data" });
  }
});

export default router;
