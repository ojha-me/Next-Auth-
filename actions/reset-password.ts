"use server";

import { getPasswordResetTokenByToken } from "@/data/password-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { newPasswordSchema, resetPasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcrypt";
import { login } from "./login";
import { signIn } from "next-auth/react";

export const resetPassword = async (
	values: z.infer<typeof resetPasswordSchema>,
) => {
	const validatedFields = resetPasswordSchema.safeParse(values);
	if (!validatedFields.success) {
		return {
			error: "Invalid email",
		};
	}
	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);
	if (!existingUser) {
		return {
			error: "No such user exists",
		};
	}

	const token = await generatePasswordResetToken(email);
	await sendPasswordResetEmail(token.email, token.token);

	return {
		success: "Email sent",
	};
};

export const newPassword = async (
	token: string,
	values: z.infer<typeof newPasswordSchema>,
) => {
	const passwordResetToken = await getPasswordResetTokenByToken(token);
	if (!passwordResetToken) {
		return {
			error: "Token not found",
		};
	}
	const validatedFields = newPasswordSchema.safeParse(values);
	if (!validatedFields.success) {
		return {
			error: "Invalid password",
		};
	}
	const { newPassword, confirmNewPassword } = validatedFields.data;
	if (newPassword !== confirmNewPassword) {
		return {
			error: "Passwords do not match",
		};
	}
	const user = await getUserByEmail(passwordResetToken.email);
	if (!user) {
		return {
			error: "No such user exists",
		};
	}
	await db.user.update({
		where: {
			email: passwordResetToken.email,
		},
		data: {
			password: await bcrypt.hash(newPassword, 10),
		},
	});

	await login({
		email: passwordResetToken.email,
		password: newPassword,
	});
	return {
		success: "Password updated",
	};
};
