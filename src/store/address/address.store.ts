import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    address: {
        firstName: string;
        lastName: string;
        address: string;
        address2?: string | null;
        postalCode: string;
        phone: string;
        province_id: string;
        city_id: string;
    };

    setAddress: (address: State['address']) => void;
}

export const useAddresStore = create<State>()(
    persist(
        (set, get) => ({

            address: {
                firstName: '',
                lastName: '',
                address: '',
                address2: '',
                postalCode: '',
                phone: '',
                province_id: '',
                city_id: '',
            },

            setAddress: (address: State['address']) => set({address}),
            
        }),
        {
            name: "address-storage",
        }
    )
)