// client/src/app/checkout/PayPalCheckout.tsx
"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalCheckout({
                                           amount,
                                           currency
                                       }: {
    amount: number;
    currency: string;
}) {
    const createOrder = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/paypal/order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, currency })
        });
        const j = await res.json();
        if (!res.ok || !j.id) throw new Error("paypal order failed");
        return j.id;
    };

    const onApprove = async (data: any) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/paypal/capture`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: data.orderID })
        });
        const j = await res.json();
        if (j.status === "COMPLETED") alert("Payment completed ✅");
        else alert("Payment status: " + j.status);
    };

    return (
        <PayPalScriptProvider options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
            currency
        }}>
            <div style={{ maxWidth: 480 }}>
                <PayPalButtons
                    style={{ layout: "vertical", shape: "rect", color: "gold" }}
                    createOrder={createOrder}
                    onApprove={(_, actions) => onApprove(_)}
                />
            </div>
        </PayPalScriptProvider>
    );
}
