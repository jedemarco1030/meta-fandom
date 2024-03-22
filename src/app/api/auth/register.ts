import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/app/lib/supabase'; // Ensure this path alias is correctly configured in your tsconfig.json
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    const { email, password, name } = req.body;

    // Create user in Supabase
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    // Check for errors in the response
    if (error) return res.status(401).json({ error: error.message });

    // Ensure the data object and the user object within it are not null
    if (!data || !data.user) return res.status(400).json({ error: "User creation failed" });

    // Proceed with inserting additional user details into your database using Prisma
    // Be cautious with storing passwords directly; ensure proper security practices
    const userData = await prisma.user.create({
        data: {
            email,
            name,
        },
    });

    return res.status(200).json({ user: userData });
}
