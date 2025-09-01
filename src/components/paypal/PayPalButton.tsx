'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import {CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions} from "@paypal/paypal-js"
import { Loader2Icon } from "lucide-react";
import { paypalCheckPayment, setTransactionId } from "@/actions";
import { socket } from "@/lib/socketClient";

interface Props {
    orderId: string; //- id del orden
    amount: number; //- cantidad que tenemos que pagar
}

export const PayPalButton = ({orderId, amount}: Props) => {

    const [{isPending}] = usePayPalScriptReducer();

    //- Redondeamos por que paypal pide no mas de 4 decimales, redondeamos a 2 decimales
    const roundedAmount = (Math.round(amount * 100)) / 100;

    if(isPending) {
        return (
            <div className="animate-pulse space-y-2">
                <div className="bg-yellow-200 rounded p-2">
                    <Loader2Icon className="animate-spin" />
                </div>
                <div className="bg-gray-300 rounded p-2">
                    <Loader2Icon className="animate-spin" />
                </div>
            </div>
        )
    }

    //*- Funcion para crear la orden en paypal
    const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        currency_code: 'USD',
                        value: `${roundedAmount}` //-lo convertimos a string
                    }
                }
            ]
        })
        //-- Guardar el id de la transaccion en la orden de base de datos
        const {ok} = await setTransactionId(orderId, transactionId)
        if(!ok) {
            throw new Error('Error updating transaction id')
        }
        return transactionId;
    }

    //*- Funcion para cuando se realiza el pago
    const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {
        const details = await actions.order?.capture();
        if(!details) return;

        const paypalPayment = await paypalCheckPayment(details.id!)

        //* ------ Emitimos en el socket ----
        if(paypalPayment.ok) {
            console.log("emitido 1:");
            socket.emit("new-order", {
                order: details,
            });
            
        }


    }


    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
        />
    )
}
