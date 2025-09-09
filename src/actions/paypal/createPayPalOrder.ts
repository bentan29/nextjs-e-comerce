'use server'

import prisma from "@/lib/prisma";

export const createPayPalOrder = async (orderId: string, amount: number) => {
  try {
    // 🔐 Autenticación con PayPal (usa sandbox o live según tu .env)
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            invoice_id: orderId,
            amount: {
              currency_code: "USD",
              value: amount.toFixed(2),
            },
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("PayPal error", data);
      return { ok: false, message: "Error creating PayPal order" };
    }

    // Guardamos el ID real de PayPal en la orden
    await prisma.order.update({
      where: { id: orderId },
      data: { transactionId: data.id },
    });

    return { ok: true, paypalOrderId: data.id };
  } catch (error: any) {
    console.error(error);
    return { ok: false, message: error.message || "Error creating PayPal order" };
  }
};
