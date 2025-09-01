import { cn } from "@/lib/utils"
import { CreditCard } from "lucide-react"

interface Props {
    isPaid: boolean;
}


export const OrderStatus = ({isPaid}: Props) => {
    return (
        <div className={cn(
            "p-1 rounded-sm shadow-sm text-white shadow-black/50 border-2 border-green-800 max-w-2xl flex items-center gap-2 justify-center bg-gradient-to-b", 
            isPaid 
                ? "from-green-900 to-green-600 border-green-500" 
                : "from-red-900 to-red-600 border-red-500")}
        >
            <CreditCard/>
            <p style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }} 
                className="text-center font-bold text-xl"
            >
                {isPaid ? "Payed" : "Not payed yet"}
            </p>
        </div>
    )
}
