// client/src/app/checkout/StripeCheckout.tsx
"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

async function createIntent(amount: number, currency: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/stripe/intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount: Math.round(Number(amount) * 100), // to minor units
            currency
        })
    });
    if (!res.ok) throw new Error("stripe intent failed");
    return res.json();
}

function StripeForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    const handlePay = async () => {
        if (!stripe || !elements) return;
        setLoading(true);
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: window.location.href }
        });
        setLoading(false);
        if (error) setMsg(error.message || "Payment failed");
        else setMsg("Processing…");
    };

    return (
        <div style={{ maxWidth: 480 }}>
            <PaymentElement />
            <button
                onClick={handlePay}
                disabled={!stripe || !elements || loading}
                style={{ marginTop: 16 }}
            >
                {loading ? "Processing…" : "Pay now"}
            </button>
            {msg && <p style={{ marginTop: 8 }}>{msg}</p>}
        </div>
    );
}

export default function StripeCheckout({
                                           amount,
                                           currency
                                       }: {
    amount: number;
    currency: string;
}) {
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        createIntent(amount, currency)
            .then((j) => alive && setClientSecret(j.clientSecret))
            .catch((e) => console.error(e));
        return () => { alive = false; };
    }, [amount, currency]);

    if (!clientSecret) return <p>Loading Stripe…</p>;

    return (
        <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance: { theme: "night" } }}
        >
            <StripeForm />
        </Elements>
    );
}
