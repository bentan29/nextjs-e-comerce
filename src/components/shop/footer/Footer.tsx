
export const Footer = () => {
    return (
        <footer>
            <div className="container mx-auto px-4 py-6 bg-secondary">
                <p className="text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Next.js E-commerce. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
