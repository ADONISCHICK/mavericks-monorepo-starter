// server/controllers/orders.js
const fs = require("fs");
const path = require("path");

const ORDERS_DB = path.join(__dirname, "..", "data", "orders.json");

function readOrders() {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_DB, "utf8"));
  } catch {
    return [];
  }
}
function writeOrders(all) {
  fs.mkdirSync(path.dirname(ORDERS_DB), { recursive: true });
  fs.writeFileSync(ORDERS_DB, JSON.stringify(all, null, 2));
}

function createOrder(order) {
  const all = readOrders();
  all.push({ id: `o_${Date.now()}`, createdAt: Date.now(), ...order });
  writeOrders(all);
  return all[all.length - 1];
}

function listOrdersByEmail(email) {
  const all = readOrders();
  return all.filter(o => (o.customer?.email || "").toLowerCase() === String(email || "").toLowerCase());
}

module.exports = { readOrders, writeOrders, createOrder, listOrdersByEmail };
