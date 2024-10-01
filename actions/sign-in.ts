"use server";

import { signInSchema } from "@/schemas";
import { z } from "zod";

export const signIn = async (values: z.infer<typeof signInSchema>) => {
	const validatedFields = signInSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Invalid email or password",
		};
	}

	return {
		success: "Sign in successful",
	};
};
