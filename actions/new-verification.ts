"use server";

import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
	const verificationToken = await getVerificationTokenByToken(token);
	if (!verificationToken) {
		return { error: "Token not found" };
	}
	if (verificationToken.expires < new Date()) {
		return { error: "Token expired" };
	}
	await db.user.update({
		where: {
			email: verificationToken.email,
		},
		data: {
			emailVerified: new Date(),
			email: verificationToken.email, // this line if for when we change the email from setting
		},
	});
	return { success: "Email verified" };
};
