import Image from "next/image";
import Link from "next/link";

export default function EmptyCartPage() {
    return (
        <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
            
            <div className="text-center px-5 mx-5">
                <h2 className="antialiased text-9xl">404</h2>
                <p className="font-semibold text-xl">Whooops! Your Cart it's empty. Buy Something</p>
                <span>Return to </span>
                <Link href="/" className="font-normal hover:underline transition-all text-blue-700">Home</Link>
            </div>


            <div className="px-5 mx-5">
                <Image
                    src="/imgs/emptycart.png" 
                    alt="Cart Empty"
                    className="p-5 sm:p-0"
                    width={550} 
                    height={550}
                />
            </div>
        </div>
        
    )
}