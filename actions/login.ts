"use server";

import { loginSchema } from "@/schemas";
import { z } from "zod";
import { signIn } from "@/auth";
import { defaultRedirect } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof loginSchema>) => {
	const validatedFields = loginSchema.safeParse(values);
	if (!validatedFields.success) {
		return {
			error: "Invalid email or password",
		};
	}
	const { email, password } = validatedFields.data;

	const currentUser = await getUserByEmail(email);
	if (!currentUser || !currentUser.email || !currentUser.password) {
		return {
			error: "User doesn't exists",
		};
	}
	if (!currentUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			currentUser.email,
		);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token,
		);
		return {
			success: "Confirmation email sent",
		};
	}
	try {
		const user = await signIn("credentials", {
			email,
			password,
			redirectTo: defaultRedirect,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						error: "Invalid email or password",
					};
				default:
					return {
						error: "Something went wrong",
					};
			}
		}
		throw error;
	}
};
