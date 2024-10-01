"use server";

import { signInSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
export const signIn = async (values: z.infer<typeof signInSchema>) => {
	const validatedFields = signInSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Invalid email or password",
		};
	}

	const { email, password, fullName } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);
	if (existingUser) {
		return {
			error: "User already exists",
		};
	}
	await db.user.create({
		data: {
			email,
			password: hashedPassword,
			name: fullName,
		},
	});
	// TODO: Send email to user for verification

	return {
		success: "Sign in successful",
	};
};
