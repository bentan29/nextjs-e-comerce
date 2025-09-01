import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/interfaces";

interface Props {
    user: User;
}

export const UserCardContainer = ({user}: Props) => {
    return (
        <div className="bg-primary-foreground p-4 rounded-lg space-y-2">
        <div className="flex items-center gap-2">
            <Avatar className="size-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JM</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-semibold">Juan Manuel</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        </p>
    </div>
    )
}
