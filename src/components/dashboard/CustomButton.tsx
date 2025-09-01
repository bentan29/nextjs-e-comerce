import { cn } from "@/lib/utils";


///--- Esto es un ejemplo como un usar cn

interface CustomButtonProps {
    disabled?: boolean;
    isRounded?: boolean;
    // size?: 'lg' | 'md' | 'sm';
    // label: string;
    // leftIcon?: React.ReactNode;
    // rightIcon?: React.ReactNode;
    //onClick?: () => void;
}

export const CustomButton = ({disabled, isRounded}: CustomButtonProps) => {
    return (
        // <button className={`text-sm ${disabled ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500'} ${isRounded && 'rounded-full'} p-4`}>
        //     CustomButton
        // </button>

        <button className={cn(
            "text-sm",
            disabled ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500',
            isRounded && 'rounded-full',
            'p-4'
        )}>
            CustomButton
        </button>
    )
}
