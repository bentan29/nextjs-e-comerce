import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./ui/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center h-screen">

            <Card className="p-4 w-[400px]">

                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-primary">Login</CardTitle>
                </CardHeader>


                <CardContent>
                    <LoginForm />
                </CardContent>

                <CardFooter>
                    <p>Don't have an account? <Link href="/auth/new-account" className="underline font-semibold underline-offset-2 px-2 hover:text-primary">Register</Link></p>
                </CardFooter>

            </Card>
            

        </div>
    );
}