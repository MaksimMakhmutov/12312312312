import { Router } from "express";
import { authRequired, adminOnly } from "../middleware/auth.js";
import User from "../models/user.js";

const router = Router();

router.get("/", authRequired, adminOnly, async (_req, res) => {
  const users = await User.find({}, { passwordHash: 0 }).sort({
    createdAt: -1,
  });
  res.json(users);
});

router.patch("/:id/role", authRequired, adminOnly, async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role))
    return res.status(400).json({ message: "Invalid role" });
  const u = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true, projection: { passwordHash: 0 } }
  );
  if (!u) return res.status(404).json({ message: "Not found" });
  res.json(u);
});

export default router;
