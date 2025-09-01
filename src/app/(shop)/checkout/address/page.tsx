
import { AddressUser } from "@/app/auth/components";
import { Truck } from "lucide-react";

export default async function AddressPage() {


    return (
        <div className="container mx-auto py-10 space-y-8">

            <div className="max-w-xl mx-auto space-y-8">

                <div className="flex items-center gap-4">
                    <Truck size={48}/>

                    <h1 className="text-4xl font-bold">
                        Add an Address
                    </h1>
                </div>

                {/* Formulario */}
                <AddressUser navigateTo="/checkout"/>

            </div>


        </div>
    );
}