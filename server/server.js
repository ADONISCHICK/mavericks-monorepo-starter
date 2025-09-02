// server/server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());

// CORS — open while deploying; we can lock this down later to your Vercel domain(s)
app.use(
  cors({
    origin: true, // allows any origin during setup; tighten later
    credentials: false,
  })
);

// --- data helpers ---
const DATA_DIR = path.join(__dirname, "data");
function readJson(filename) {
  const p = path.join(DATA_DIR, filename);
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

// Load data once (good enough for a demo/mock API)
const PRODUCTS = readJson("products.json");
const ORDERS = readJson("orders.json");

// --- basic routes so Render has something to show ---
app.get("/", (req, res) => {
  res
    .type("text")
    .send(
      [
        "Mavericks API ✅",
        "",
        "Try these endpoints:",
        "  • GET /health",
        "  • GET /products",
        "  • GET /products/1",
        "",
        "Tip: your client should point NEXT_PUBLIC_API_URL to this base URL.",
      ].join("\n")
    );
});

app.get("/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// --- products listing with filters + pagination ---
app.get("/products", (req, res) => {
  let {
    q,
    category,
    min,
    max,
    page = "1",
    limit = "24",
    sort = "newest",
  } = req.query;

  let list = PRODUCTS.slice();

  if (q) {
    const s = String(q).toLowerCase();
    list = list.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(s) ||
        (p.description || "").toLowerCase().includes(s)
    );
  }
  if (category) {
    list = list.filter((p) => String(p.category || "") === String(category));
  }
  if (min) list = list.filter((p) => Number(p.price) >= Number(min));
  if (max) list = list.filter((p) => Number(p.price) <= Number(max));

  switch (String(sort)) {
    case "price_asc":
      list.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case "price_desc":
      list.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case "newest":
    default:
      list.sort(
        (a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0)
      );
  }

  const total = list.length;
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.min(60, parseInt(limit, 10) || 24);
  const start = (p - 1) * l;
  const items = list.slice(start, start + l);

  res.json({ page: p, limit: l, total, items });
});

// --- single product ---
app.get("/products/:id", (req, res) => {
  const id = String(req.params.id);
  const item = PRODUCTS.find((p) => String(p.id) === id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// (stub) orders to show the server is alive; expand later
app.get("/orders", (req, res) => {
  res.json({ total: ORDERS.length, items: ORDERS });
});

// IMPORTANT for Render: use their provided PORT and bind to 0.0.0.0
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running at http://localhost:${PORT}`);
});
