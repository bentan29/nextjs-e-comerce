import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils";

interface Props {
    title: string;
    message?: string;
    action: string;
    onConfirm?: () => void;
}
  
export function AlertConfirmDialog({ 
    title, 
    message,
    action,
    onConfirm,
}: Props) {
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                {
                    message && (
                        <AlertDialogDescription>
                            {message}
                        </AlertDialogDescription>
                    )
                }
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={onConfirm}
                    className={cn(
                        "text-white cursor-pointer rounded-sm hover:shadow-sidebar transition-all duration-300 shadow-md",
                        action === "destroy" && "bg-red-600 hover:bg-red-700",
                        action === "success" && "bg-green-600 hover:bg-green-700"
                    )}
                >
                    Confirm
                </AlertDialogAction> 
            </AlertDialogFooter>
        </AlertDialogContent>
    )
  }
  