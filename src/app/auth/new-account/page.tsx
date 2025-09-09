
import Link from "next/link";
import { RegisterForm } from "./ui/RegisterForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterUserForm } from "./ui/RegisterUserForm";


export default function NewAccountPage() {
    return (
        <div className="flex items-center justify-center h-screen">

            <Card className="p-4 w-[400px]">

                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-primary">New Account</CardTitle>
                    <CardDescription>
                        Create an account to shopping
                    </CardDescription>
                </CardHeader>


                <CardContent>
                    <RegisterForm />
                    {/* <RegisterUserForm /> */}
                </CardContent>

                <CardFooter>
                    <p>Already have an account? <Link href="/auth/login" className="underline font-semibold underline-offset-2 px-2 hover:text-primary">Login</Link></p>
                </CardFooter>

            </Card>
            

        </div>
    );
}