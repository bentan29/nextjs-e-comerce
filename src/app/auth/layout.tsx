import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({children}: {children: React.ReactNode}) {
    
    const session = await auth();

    //- Si ya tenemos un usuario no podemos ingresar y nos vamos al inicio
    if(session?.user) {
        redirect('/');
    }
    
    return (
        <section>
            {children}
        </section>
    );
}