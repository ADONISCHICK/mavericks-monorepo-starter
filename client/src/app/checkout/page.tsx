// client/src/app/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const StripeCheckout = dynamic(() => import("./StripeCheckout"), { ssr: false });
const PayPalCheckout = dynamic(() => import("./PayPalCheckout"), { ssr: false });

export default function CheckoutPage() {
    const [method, setMethod] = useState<"stripe" | "paypal">("stripe");
    const [amount, setAmount] = useState<number>(49.99);
    const [currency, setCurrency] = useState<string>("USD");

    useEffect(() => {
        // Optional: read from query or cart context
    }, []);

    return (
        <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
            <h1>Checkout</h1>

            <div style={{ display: "flex", gap: 16, margin: "12px 0" }}>
                <label>
                    Amount&nbsp;
                    <input
                        type="number"
                        min={1}
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                </label>
                <label>
                    Currency&nbsp;
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>ZAR</option>
                        <option>NGN</option>
                        <option>INR</option>
                        <option>AED</option>
                    </select>
                </label>
                <label>
                    Method&nbsp;
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value as any)}
                    >
                        <option value="stripe">Card (Stripe)</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </label>
            </div>

            {method === "stripe" ? (
                <StripeCheckout amount={amount} currency={currency} />
            ) : (
                <PayPalCheckout amount={amount} currency={currency} />
            )}
        </div>
    );
}
