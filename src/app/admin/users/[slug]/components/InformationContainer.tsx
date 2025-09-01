import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { EditUser } from "@/components"
import { User } from "@/interfaces"

interface Props {
    user: User;
}



export const InformationContainer = ({user}: Props) => {

    return (
        <div className="bg-primary-foreground p-4 rounded-lg">

            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">User Information</h1>
                
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="sm" variant="secondary">
                            <Pencil/>Edit User
                        </Button>
                    </SheetTrigger>

                    {/* Conenido de sidebar Editar usuario*/}
                    <EditUser user={user} />

                </Sheet>

            </div>

            <div className="space-y-4 mt-4">
                <div className="flex flex-col gap-2 mb-8">
                    <p className="text-sm text-muted-foreground">Profile completetion</p>
                    <Progress value={66}/>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Username:</span>
                    <span className="text-muted-foreground">{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Email:</span>
                    <span className="text-muted-foreground">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Phone:</span>
                    <span className="text-muted-foreground">{user.address?.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Address:</span>
                    <span className="text-muted-foreground">{user.address?.address}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Role:</span>
                    <Badge className={cn( 
                        user.role === "admin" && "bg-blue-500 text-white",
                        user.role === "user" && "bg-green-500 text-white",
                    )}>{user.role}</Badge>
                </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">Joined on {user.createdAt.toDateString()}</p>
            
        </div>
    )
}
