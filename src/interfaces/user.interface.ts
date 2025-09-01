import { Address } from "./addres.interface";

export interface User {
    id: string;
    name: string;
    email: string;
    // emailVerified: Date | null;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
    address?: Address | null;
}


