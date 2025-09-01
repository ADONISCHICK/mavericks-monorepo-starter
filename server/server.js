// server/server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Path to products.json
const DB = path.join(__dirname, "data", "products.json");
function readProducts() {
  try {
    const raw = fs.readFileSync(DB, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Health
app.get("/health", (_req, res) => res.json({ ok: true }));

// List with pagination (always returns an object with items[])
app.get("/products", (req, res) => {
  const { page = "1", limit = "24" } = req.query;
  const items = readProducts();
  const p = Math.max(1, parseInt(page, 10) || 1);
  const L = Math.min(60, parseInt(limit, 10) || 24);
  const start = (p - 1) * L;
  res.json({ items: items.slice(start, start + L), page: p, total: items.length, limit: L });
});

// Single
app.get("/products/:id", (req, res) => {
  const item = readProducts().find((p) => String(p.id) === String(req.params.id));
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// Start
app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use. Try: pkill -9 node`);
    process.exit(1);
  } else {
    throw err;
  }
});
