import { Router } from "express";
import Transaction from "../models/transaction/Transaction.model";
import { protect, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

// Create a transaction
router.post("/", protect, async (req: AuthRequest, res) => {
  try {
    const { type, amount, category, date, note } = req.body;

    const transaction = await Transaction.create({
      user: req.user?.id,
      type,
      amount,
      category,
      date,
      note,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to create transaction", error });
  }
});

// Get summary (total income, total expense, balance)
router.get("/summary", protect, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;

    const summary = await Transaction.aggregate([
      {
        $match: {
          user: new (require("mongoose").Types.ObjectId)(userId),
        },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let income = 0;
    let expense = 0;

    summary.forEach((item) => {
      if (item._id === "income") income = item.total;
      if (item._id === "expense") expense = item.total;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch summary", error });
  }
});


// Get monthly summary (total income and expense per month)
router.get("/monthly", protect, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;

    const monthlyData = await Transaction.aggregate([
      {
        $match: {
          user: new (require("mongoose").Types.ObjectId)(userId),
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.json(monthlyData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch monthly data", error });
  }
});


// Get transactions with optional filters
router.get("/", protect, async (req: AuthRequest, res) => {
  try {
    const { type, category } = req.query;

    const filter: any = { user: req.user?.id };

    if (type) filter.type = type;
    if (category) filter.category = category;

    const transactions = await Transaction.find(filter).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
});

// Update a transaction
router.put("/:id", protect, async (req: AuthRequest, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update transaction", error });
  }
});

// Delete a transaction
router.delete("/:id", protect, async (req: AuthRequest, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user?.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete transaction", error });
  }
});


export default router;
