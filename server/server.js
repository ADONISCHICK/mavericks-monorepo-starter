// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// --- core middleware ---
app.use(express.json());
app.use(cors({ origin: '*' }));

// --- quick health + root routes so Render health-checks pass ---
app.get('/', (_req, res) => res.status(200).send('API OK'));
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

// --- demo data & routes (adjust to your project) ---
const products = require(path.join(__dirname, 'data', 'products.json'));
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');

app.get('/products', (req, res) => {
  // basic filter/sort/paginate kept from your earlier setup
  let list = products.slice();
  const { q, category, min, max, sort = 'newest', limit = '24', page = '1' } = req.query;

  if (q) {
    const s = String(q).toLowerCase();
    list = list.filter(
      p =>
        p.title.toLowerCase().includes(s) ||
        (p.description || '').toLowerCase().includes(s)
    );
  }
  if (category) list = list.filter(p => p.category === category);
  if (min) list = list.filter(p => p.price >= Number(min));
  if (max) list = list.filter(p => p.price <= Number(max));

  switch (sort) {
    case 'price_asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      break;
  }

  const total = list.length;
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.min(60, Math.max(1, parseInt(limit, 10) || 24));
  const start = (p - 1) * l;
  const items = list.slice(start, start + l);

  res.json({ page: p, limit: l, total, items });
});

app.get('/products/:id', (req, res) => {
  const item = products.find(p => p.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// mount other route files if you use them
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);

// --- start ---
const PORT = process.env.PORT || 4000; // Render provides PORT
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
