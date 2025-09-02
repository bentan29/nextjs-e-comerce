'use server'

import prisma from "@/lib/prisma"

import { AddressFormValues } from "@/schema"

export const setUserAddress = async (address: AddressFormValues, userId: string) => {
    
    try {

        const newAddress = await createOrReplaceAddress(address, userId)

        return {
            ok: true,
            message: 'User address set successfully',
            address: newAddress
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Could not set user address'
        }
    }
}

const createOrReplaceAddress = async (address: AddressFormValues, userId: string) => {
    try {
        const storeAddress = await prisma.userAddress.findUnique({
            where: {userId}
        })

        //-- Si no existe creamos un address
        if(!storeAddress) {
            const newAddress = await prisma.userAddress.create({
                data: {
                    ...address,
                    userId
                }
            })

            return {
                ok: true,
                message: 'User address created successfully',
                address: newAddress
            };
        }

        //-- Si existe actualizamos
        const updatedAddress = await prisma.userAddress.update({
            where: {userId},
            data: address
        })

        return {
            ok: true,
            message: 'User address updated successfully',
            updatedAddress
        };

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Could not create or replace user address'
        }
    }
}