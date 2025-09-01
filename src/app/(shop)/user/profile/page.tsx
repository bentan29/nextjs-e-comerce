import { getUserById } from "@/actions";
import { RegisterForm } from "@/app/auth/new-account/ui/RegisterForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

    const session = await auth();
    
    if(!session?.user) {
        redirect('/');
    }

    const user = await getUserById(session?.user?.id!);

    return (

        <div className="p-8 lg:px-35">
            <h1 className="text-4xl font-bold mb-8">User Data</h1>

            <RegisterForm user={user!}/>

        </div>

    );
}