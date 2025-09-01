'use client'

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./ThemeProvider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface Props {
    children: React.ReactNode;
}

export const Providers = ({children}: Props) => {    
    return (
        <PayPalScriptProvider options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
            currency: "USD",
            intent: "capture"
        }}>
            <ThemeProvider  // --- Provedor de Temas oscuro claro
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
                >

                <SessionProvider> {/* --- Provedor de Sesión */}
                    {children}
                </SessionProvider>

            </ThemeProvider>
        </PayPalScriptProvider>

    );
}