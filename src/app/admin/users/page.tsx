import { getUsers } from "@/actions";
import { UsersTable } from "./table-users/users-table";
import { usersColumns } from "./table-users/users-columns";

export default async function UsersPage() {
    
    const users = await getUsers();

    ///console.log(users)   

    return (
        <div>
    
            <div className="mb-5 py-2 rounded-md">
                <h1 className="text-3xl font-bold">Users</h1>
            </div>
            
            {/* <UsersTable<User, unknown>  */}
            <UsersTable 
                columns={usersColumns} 
                data={users} 
            />
        </div>
    );
}