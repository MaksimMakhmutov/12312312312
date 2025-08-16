import { Router } from "express";
import Product from "../models/Product.js";
import { authRequired, adminOnly } from "../middleware/auth.js";

const router = Router();

/**
 * GET /api/products
 * query: q, category, page=1, limit=6
 */
router.get("/", async (req, res) => {
  const { q = "", category = "", page = 1, limit = 6 } = req.query;
  const filter = {};
  if (q) filter.name = { $regex: q, $options: "i" };
  if (category) filter.category = category;

  const pageNum = Math.max(parseInt(page) || 1, 1);
  const lim = Math.max(parseInt(limit) || 6, 1);

  const [total, data] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * lim)
      .limit(lim),
  ]);

  res.json({ data, total, page: pageNum, limit: lim });
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

// Admin CRUD
router.post("/", authRequired, adminOnly, async (req, res) => {
  const { name, category, price, image } = req.body;
  if (!name || !category || price == null)
    return res.status(400).json({ message: "Missing fields" });
  const p = await Product.create({ name, category, price, image });
  res.status(201).json(p);
});

router.put("/:id", authRequired, adminOnly, async (req, res) => {
  const { name, category, price, image } = req.body;
  const p = await Product.findByIdAndUpdate(
    req.params.id,
    { name, category, price, image },
    { new: true }
  );
  if (!p) return res.status(404).json({ message: "Not found" });
  res.json(p);
});

router.delete("/:id", authRequired, adminOnly, async (req, res) => {
  const del = await Product.findByIdAndDelete(req.params.id);
  if (!del) return res.status(404).json({ message: "Not found" });
  res.json({ ok: true });
});

export default router;
