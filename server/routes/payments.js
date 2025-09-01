// server/routes/payments.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const paypalCore = require("@paypal/checkout-server-sdk");
const { createOrder } = require("../controllers/orders");
require("dotenv").config();

/* =============== Stripe (hosted Checkout) =============== */
const stripeKey = process.env.STRIPE_SECRET_KEY || "";
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: "2024-06-20" }) : null;

/** Create Checkout Session and return URL */
router.post("/stripe/checkout", async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ error: "Stripe not configured" });

    const { items = [], currency = "USD", customer_email } = req.body || {};
    const line_items = items.map((p) => ({
      price_data: {
        currency,
        product_data: { name: p.title || "Item", images: p.images || [] },
        unit_amount: Math.round(Number(p.price || 0) * 100),
      },
      quantity: Math.max(1, Number(p.qty || 1)),
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email,
      success_url: `${process.env.BASE_URL}/checkout/success?sid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/checkout/cancel`,
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err?.message);
    return res.status(500).json({ error: "stripe_checkout_failed", detail: err?.message });
  }
});

/** Given a session id (?sid=...), fetch from Stripe and store order */
router.post("/stripe/store-session", async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ error: "Stripe not configured" });
    const { sid } = req.body || {};
    if (!sid) return res.status(400).json({ error: "sid required" });

    const session = await stripe.checkout.sessions.retrieve(sid, { expand: ["line_items"] });
    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({ error: "session_not_paid" });
    }

    const order = createOrder({
      provider: "stripe",
      providerId: session.id,
      amount_total: session.amount_total,
      currency: session.currency?.toUpperCase(),
      customer: { email: session.customer_details?.email || session.customer_email || "unknown" },
      items: (session.line_items?.data || []).map((li) => ({
        title: li.description,
        qty: li.quantity,
        amount_subtotal: li.amount_subtotal,
        amount_total: li.amount_total,
      })),
      status: "PAID",
    });

    return res.json({ ok: true, order });
  } catch (err) {
    console.error("Stripe store-session error:", err?.message);
    return res.status(500).json({ error: "stripe_store_failed", detail: err?.message });
  }
});

/* =============== PayPal =============== */
function paypalClient() {
  const Environment =
    process.env.PAYPAL_ENV === "live"
      ? paypalCore.core.LiveEnvironment
      : paypalCore.core.SandboxEnvironment;

  const env = new Environment(
    process.env.PAYPAL_CLIENT_ID || "",
    process.env.PAYPAL_CLIENT_SECRET || ""
  );
  return new paypalCore.core.PayPalHttpClient(env);
}

/** Create PayPal Order → return approveUrl for redirect */
router.post("/paypal/order", async (req, res) => {
  try {
    const { amount, currency = "USD", customer_email } = req.body || {};
    if (!amount) return res.status(400).json({ error: "amount required" });

    const request = new paypalCore.orders.OrdersCreateRequest();
    request.headers["prefer"] = "return=representation";
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        { amount: { currency_code: currency, value: String(Number(amount).toFixed(2)) } }
      ],
      application_context: {
        brand_name: "Mavericks",
        user_action: "PAY_NOW",
        return_url: `${process.env.BASE_URL}/checkout?paypal=return`,
        cancel_url: `${process.env.BASE_URL}/checkout?paypal=cancel`
      }
    });

    const client = paypalClient();
    const response = await client.execute(request);
    const approveLink = response.result?.links?.find((l) => l.rel === "approve")?.href || null;

    // Store a pending order (optional). We’ll finalize on capture.
    createOrder({
      provider: "paypal",
      providerId: response.result.id,
      amount_total: Number(amount) * 100,
      currency: currency.toUpperCase(),
      customer: { email: customer_email || "unknown" },
      items: [{ title: "Order", qty: 1, amount_total: Number(amount) * 100 }],
      status: "CREATED"
    });

    return res.json({ id: response.result.id, approveUrl: approveLink });
  } catch (err) {
    console.error("PayPal order error:", err?.message);
    return res.status(500).json({ error: "paypal_order_failed", detail: err?.message });
  }
});

/** Capture PayPal Order after buyer returns; also persist PAID status */
router.post("/paypal/capture", async (req, res) => {
  try {
    const { orderId } = req.body || {};
    if (!orderId) return res.status(400).json({ error: "orderId required" });

    const request = new paypalCore.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const client = paypalClient();
    const response = await client.execute(request);

    if (response.result.status === "COMPLETED") {
      const payerEmail =
        response.result.payer?.email_address ||
        response.result.purchase_units?.[0]?.payee?.email_address ||
        "unknown";

      const amountObj = response.result.purchase_units?.[0]?.payments?.captures?.[0]?.amount;
      const currency_code = amountObj?.currency_code || "USD";
      const value = Number(amountObj?.value || "0");

      const order = createOrder({
        provider: "paypal",
        providerId: orderId,
        amount_total: Math.round(value * 100),
        currency: currency_code,
        customer: { email: payerEmail },
        items: [{ title: "Order", qty: 1, amount_total: Math.round(value * 100) }],
        status: "PAID"
      });

      return res.json({ status: "COMPLETED", order });
    }

    return res.json({ status: response.result.status });
  } catch (err) {
    console.error("PayPal capture error:", err?.message);
    return res.status(500).json({ error: "paypal_capture_failed", detail: err?.message });
  }
});

module.exports = router;
