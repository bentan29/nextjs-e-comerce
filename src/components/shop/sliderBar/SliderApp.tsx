import { getRandomProducts } from "@/actions"
import { SliderBar3 } from "./SlideBar3"

export const SliderApp = async () => {

    //-Tomamos de la base de datos una cantidad random de productos
    const {products} = await getRandomProducts({limit: 15})

    return (
        <SliderBar3 prod={products ?? []}/>
    )
}
