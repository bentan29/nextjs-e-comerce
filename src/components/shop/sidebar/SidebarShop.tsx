import { SearchFilter, SideBarAccordion } from "@/components"
import { SheetContent,  SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Suspense } from "react"

export const SidebarShop = () => {
    return (
        <SheetContent side="left">
            <SheetHeader>

                <SheetTitle className="text-lg font-semibold">SideBar Shop</SheetTitle>

            </SheetHeader>
            
            <div className="px-4">
                <Suspense fallback={<p>Loading...</p>}>
                    <SearchFilter/>
                </Suspense>

                <SideBarAccordion/>
            </div>
            
        </SheetContent>
    )
}
