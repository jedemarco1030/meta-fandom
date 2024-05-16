"use server";

import bcrypt from "bcryptjs";
import type * as z from "zod";

import { update } from "@/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma-client";
import { generateVerificationToken } from "@/lib/tokens";
import type { SettingsSchema } from "@/schemas";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const prismaUser = await getUserById(user.id);

  if (!prismaUser) {
    return { error: "Unauthorized" };
  }

  const updatedValues = { ...values };

  if (user.isOAuth) {
    updatedValues.email = undefined;
    updatedValues.password = undefined;
    updatedValues.newPassword = undefined;
    updatedValues.isTwoFactorEnabled = undefined;
  }

  if (updatedValues.email && updatedValues.email !== user.email) {
    const existingUser = await getUserByEmail(updatedValues.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(
      updatedValues.email,
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Verification email sent!" };
  }

  if (
    updatedValues.password &&
    updatedValues.newPassword &&
    prismaUser.password
  ) {
    const passwordsMatch = await bcrypt.compare(
      updatedValues.password,
      prismaUser.password,
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    updatedValues.password = await bcrypt.hash(updatedValues.newPassword, 10);
    updatedValues.newPassword = undefined;
  }

  const updatedUser = await prisma.user.update({
    where: { id: prismaUser.id },
    data: {
      ...updatedValues,
    },
  });

  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    },
  });

  return { success: "Settings Updated!" };
};
