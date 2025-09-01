import { cn } from '@/lib/utils';
import { CreditCard } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface Props {
    orders: {
        id: string;
        isPaid: boolean;
        createdAt: Date;
        orderAddress: {
            firstName: string;
            lastName: string;
        } | null;
    }[];
}

export const ListOrders = ({orders} : Props) => {
    return (
        <article className="mb-10">
            <table className="min-w-full">
                <thead className="bg-gray-200 border-b border-gray-300">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            #ID
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Nombre completo
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Estado
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Opciones 
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map((order: any) => (
                            <tr key={order.id} className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {order.id.split('-').at(-1)}
                                </td>

                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {order.orderAddress?.firstName + ' ' + order.orderAddress?.lastName}
                                </td>

                                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <CreditCard className={
                                        cn ({
                                            "text-green-800" : order.isPaid,
                                            "text-red-800" : !order.isPaid
                                        })
                                    } />
                                    <span className={
                                        cn (
                                            "mx-2",
                                            {
                                                "text-green-800" : order.isPaid,
                                                "text-red-800" : !order.isPaid
                                            }
                                        )
                                    }>{order.isPaid ? 'Pagada' : 'No pagada'}</span>
                                </td>

                                <td className="text-sm text-gray-900 font-light px-6 ">
                                    <Link href={`/user/orders/${order.id}`} className="hover:underline">
                                        Ver orden
                                    </Link>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </article>
    )
}
