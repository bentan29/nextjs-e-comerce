import { getOrdersByUserId,} from "@/actions";
import { CardList } from "@/components/dashboard/CardList";
import { notFound } from "next/navigation";
import { UserBadgesContainer } from "./components/UserBadgesContainer";
import { InformationContainer } from "./components";


// interface Props {
//     params: {
//         slug: string;
//     }
// }

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function SingleUserPage({params}: Props) {

    const { slug } = await params;
    // const id = slug.split("_")[0];
    
    const [id, ...nameParts] = slug.split('_');
    const name = nameParts.join('_'); // por si el nombre tiene guiones

    //-- Peticion al action server para obtener el usuario
    // const user = await getUserById(id);
    const userOrders = await getOrdersByUserId({userId:(id)});
    if ("ok" in userOrders && userOrders.ok === false) { // Si vino un error desde el action
        console.error(userOrders.message);
        notFound();
    }

    const {orders, user, totalOrders} = userOrders;

    console.log({user});

    if(!user) {
        notFound()
    }
    
    return (
        <div className="mb-4">

             <div className="mt-4 flex flex-col xl:flex-row gap-8">

                {/* LEFT */}
                <div className="w-full xl:w-1/3 space-y-6">

                    {/* USER BADGES CONTAINER */}
                    <UserBadgesContainer 
                        userName={user.name}
                        totalOrders={totalOrders}
                    />

                    {/* !!! INFORMATION CONTAINER, Edit User esta acá !!! */}
                     <InformationContainer
                        user={user}
                    /> 
        
                </div>

                {/* RIGHT */}
                <div className="w-full xl:w-2/3 space-y-6">

                    {/* CARD LIST CONTAINER */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <CardList 
                            title="Transactions"
                            orders={orders}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
}