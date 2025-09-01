import { getAllCities, getProvince, getUserById } from "@/actions";
import { auth } from "@/auth";
import { UserFormContent } from "@/components";
import { AddressForm } from "./ui/AddressForm";
// import { AddressForm } from "./ui/AddressForm";

interface Props {
    navigateTo?: string;
}

export const AddressUser = async ({navigateTo}: Props) => {

    const session = await auth();

    if(!session?.user) {
        return <h3 className="text-5xl font-bold">500 - There's no session found</h3>;
    }

    //- Obtenemos el address del usuario si es que tenemos uno
    // const userAddres = await getUserAddress(session.user.id);
    const user = await getUserById(session.user.id);
    const provinces = await getProvince();
    const cities = await getAllCities();

    
    return (

        <AddressForm
            provinces={provinces}
            cities={cities}
            userAddress={user?.address}
            navigateTo={navigateTo}
        />

        // <UserFormContent 
        //     user={user!}
        //     // navigateTo={navigateTo}
        // />
    )
}
