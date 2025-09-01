
import { AddressUser } from "@/app/auth/components";
import { auth } from "@/auth";

export default async function AddressProfilePage() {

    const session = await auth();
    
    return (
        <div className="p-8 lg:px-35">
            <h1 className="text-4xl font-bold mb-8">Edit User Address</h1>

            <AddressUser />
        </div>
    );
}