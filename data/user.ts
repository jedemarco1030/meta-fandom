import { prisma } from "@/lib/prisma-client";

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
};

export const getUserById = async (id: string | undefined) => {
  if (id === undefined) {
    return null;
  }

  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch {
    return null;
  }
};
