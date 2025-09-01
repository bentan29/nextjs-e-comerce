'use client'

import { changeConfirmationOrder } from "@/actions";
import { AlertConfirmDialog } from "@/components";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useOptimistic, useState } from "react";

interface Props {
    orderConfirm: boolean;
    orderId: string;
}

export const ConfirmOrder = ({ orderConfirm, orderId }: Props) => {

    const router = useRouter();
    const session = useSession();

    const [open, setOpen] = useState(false);
    const [pendingValue, setPendingValue] = useState(orderConfirm);

    const [optimisticOrder, setOptimisticOrder] = useOptimistic(
        orderConfirm,
        (state, newIsConfirmed:boolean) => newIsConfirmed 
    );

    // 🔴 Carga los cambios en tiempo real
    useEffect(() => {
        const channel = new BroadcastChannel("orders");
        channel.onmessage = () => {
          router.refresh();
        };
        return () => channel.close();
    }, [router]);
      

    const handleSwitchChange = (value: boolean) => {
        if(session.data?.user.role !== "admin") return;
        setPendingValue(value);
        setOpen(true); // abre el dialogo
    };

    //----- Funcion que va al AlertDialog... cambiamos la confirmacion del pedido, la orden
    const handleConfirm = async () => {
        try{
            startTransition(() => setOptimisticOrder(pendingValue));
            await changeConfirmationOrder(orderId, pendingValue);

            // 🔴 Avisar a otras pestañas que hay cambios
            const channel = new BroadcastChannel("orders");
            channel.postMessage({ updated: true });
            channel.close();

            // Fuerza refresh para traer datos reales
            router.refresh();
        }catch(error){
            // Revertir si falla
            startTransition(() => setOptimisticOrder(!pendingValue));
            console.error(error);
        }
        setOpen(false);
    };
    

    return (
        <div className="flex items-center space-x-2 ">

            <Switch
                id={orderId}
                checked={optimisticOrder}
                onCheckedChange={handleSwitchChange}
            />
            
            <Label htmlFor={orderId} className="text-xs">
                {optimisticOrder ? (
                        <ShieldCheck className="text-green-500" size={20} />
                    ) : (
                        <X className="text-red-500" size={20} />
                    )
                }
            </Label>
    
            {/* Dialogo de confirmación */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertConfirmDialog
                    title={pendingValue ? "Cancel Order" : "Confirm Order"}
                    message={`Order Id: ${orderId}`}
                    action={pendingValue ? "destroy" : "success"}
                    onConfirm={handleConfirm}
                />
            </AlertDialog>
        </div>
    );
}
