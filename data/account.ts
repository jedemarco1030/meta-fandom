import { prisma } from "@/lib/prisma-client";

export const getAccountByUserId = async (userId: string) => {
  try {
    return await prisma.account.findFirst({
      where: { userId },
    });
  } catch {
    return null;
  }
};
