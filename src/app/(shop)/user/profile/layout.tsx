
import { auth } from "@/auth";
import { MapPinHouse, Settings, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Layout({children}: {children: React.ReactNode}) {

    const session = await auth();
    
    if(!session?.user) {
        redirect('/');
    }
    
    return (
        <section className="py-8 container mx-auto grid grid-cols-1 md:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_4fr]">

            <div className="flex md:flex-col gap-4 max-w-[300px]">

                <div className="hidden md:flex items-center text-xl gap-2 ">
                    <Settings />
                    <h1 className="flex font-bold">User Settings</h1>
                </div>

                <div className="flex flex-row md:flex-col gap-2">
                    <Link href="/user/profile" className="text-muted-foreground flex items-center gap-1.5 p-1 px-2 hover:bg-white/5 transition-all duration-300">
                        <User size={20} />Profile
                    </Link>

                    <Link href="/user/profile/address" className="text-muted-foreground flex items-center gap-1.5 px-2  p-1 hover:bg-white/5 transition-all duration-300">
                        <MapPinHouse size={20} />Address
                    </Link>
                </div>
            </div>

            <div className="bg-white/5 p-2 mt-5 md:mt-0 rounded-sm">
                {children}
            </div>
        </section>
    );
}