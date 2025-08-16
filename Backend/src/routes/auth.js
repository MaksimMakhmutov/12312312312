import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Cart from "../models/Cart.js";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists)
      return res.status(409).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      role: role === "admin" ? "admin" : "user",
    });

    // создать пустую корзину
    await Cart.create({ userId: user._id, items: [] });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || "").toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
