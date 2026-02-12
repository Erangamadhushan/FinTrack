import { Router } from "express";
import User from "../models/user/User.model";
import { protect, AuthRequest } from "../middleware/auth.middleware";
import bcrypt from "bcryptjs";

const router = Router();

// Get user profile
router.get("/profile", protect, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

// Update user profile
router.put("/profile", protect, async (req: AuthRequest, res) => {
  try {
    const { name, currency, monthlyBudget } = req.body;

    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (currency) user.currency = currency;
    if (monthlyBudget !== undefined) user.monthlyBudget = monthlyBudget;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        currency: user.currency,
        monthlyBudget: user.monthlyBudget,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
});

export default router;
