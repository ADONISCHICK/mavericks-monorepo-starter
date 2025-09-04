const express = require('express');
const router = express.Router();

/**
 * Payments are temporarily disabled for this deployment.
 * These stubs keep routes stable without importing Stripe/PayPal SDKs.
 */

router.post('/create-checkout-session', (_req, res) => {
  res.status(501).json({
    ok: false,
    error: 'Payments are temporarily disabled. Please try again later.'
  });
});

// Webhook stub: respond 200 so external services aren’t confused if configured
router.post('/webhook', (_req, res) => {
  res.status(200).end();
});

module.exports = router;
