
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../../ui/sheet"
import { User } from "@/interfaces";
import { UserFormContent } from "@/components";


interface Props {
    user: User;
}

export const EditUser = async ({user}: Props) => {

    // const provinces = await getProvince();
    // const cities = await getAllCities();

    return (
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-lg font-semibold mb-2">
                    Edit User
                </SheetTitle>

                {/* Contenedor del formulario de usuario */}
                <UserFormContent user={user}/>

            </SheetHeader>



        </SheetContent>
    )
}
