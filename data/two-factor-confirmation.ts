import { prisma } from "@/lib/prisma-client";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    return await prisma.twoFactorConfirmation.findUnique({
      where: { userId },
    });
  } catch {
    return null;
  }
};
