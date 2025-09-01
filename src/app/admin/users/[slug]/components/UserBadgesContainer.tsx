import { BadgeCheck, BadgeX, User,} from "lucide-react";


interface Props {
    userName: string;
    totalOrders: number;
}

export const UserBadgesContainer = ({userName, totalOrders}: Props) => {
    return (
        <div className="bg-primary-foreground p-4 rounded-lg">
            <h1 className="flex gap-2 items center text-xl font-semibold">
                <span className="text-muted-foreground flex items-center">
                    <User className="w-6 h-6" />User :
                </span>  
                    {userName}
            </h1>

            <div className="flex items-center gap-4 mt-4">

                { totalOrders > 0 ?
                    <>
                        <p className="flex items center text-xl gap-2 font-medium text-muted-foreground">
                            <span className="font-extrabold text-primary px-3 py-0.5 rounded-full bg-blue-500/30 border-1 border-blue-500/50">
                                {totalOrders}
                            </span> Transactions Success
                        </p>
                    </>
                    :
                    <>
                        <BadgeX size={36} className="rounded-full bg-red-500/30 border-1 border-red-500/50 p-1"/>
                        <p className="text-lg font-medium text-muted-foreground">No transactions yet</p>
                    </>
                }
            
            </div>
        </div>
    )
}
