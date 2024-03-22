// src/app/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// Check if we're in a production environment. In production, we want to reuse the same Prisma client
// between requests to prevent exhausting database connections.
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    // In development, global variables are reset with every change, so we use this workaround
    // to ensure that we're reusing the same Prisma client across hot reloads.
    if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient();
    }
    prisma = (global as any).prisma;
}

export default prisma;
