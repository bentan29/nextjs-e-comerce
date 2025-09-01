import React from 'react'
import { UserForm } from './UserForm'
import { getAllCities, getProvince } from '@/actions';
import { User } from '@/interfaces';

interface Props {
    user: User;
    navigateTo?: string;
}

export const UserFormContent = async ({user, navigateTo}: Props) => {

    const provinces = await getProvince();
    const cities = await getAllCities();

    return (
        <UserForm 
            user={user} 
            provinces={provinces}
            cities={cities}
            // navigateTo={navigateTo}
        />
    )
}
