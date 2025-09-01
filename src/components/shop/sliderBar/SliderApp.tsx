import { getRandomProducts } from "@/actions"
import { SliderBar } from "./SliderBar"

export const SliderApp = async () => {

    //-Tomamos de la base de datos una cantidad random de productos
    const {products} = await getRandomProducts({limit: 5})

    return (
        <SliderBar prod={products ?? []}/>
    )
}
