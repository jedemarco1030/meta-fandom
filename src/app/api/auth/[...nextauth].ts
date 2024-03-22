// src/app/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/app/lib/prisma'; // Adjust the import path as necessary
import bcrypt from 'bcryptjs';

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials) return null;

                // Fetch the user from the database by email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                // If no user is found, or the password doesn't match, return null
                if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
                    return null;
                }

                // If the user is found and the password matches, return the user object
                return {
                    id: user.id.toString(), // Convert to string if your ID is numeric
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },
});
