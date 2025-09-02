// Esto esta sin uso actualmente ------------- *****

import prisma from "../../lib/prisma";

export async function generateStaticParams() {
    const users = await prisma.user.findMany({
        select: { 
            id: true, 
            name: true 
        }
    });

    return users.map((user) => ({
        slug: `${user.id}_${slugify(user.name)}`,
    }));
}

function slugify(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}
