// server/routes/orders.js
const express = require("express");
const router = express.Router();
const { listOrdersByEmail } = require("../controllers/orders");

router.get("/", (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "email required" });
  const items = listOrdersByEmail(String(email));
  res.json({ items });
});

module.exports = router;
