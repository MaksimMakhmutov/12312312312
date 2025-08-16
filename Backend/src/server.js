import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import "./config/db.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) =>
  res.json({ ok: true, service: "online-store-api" })
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`)
);
