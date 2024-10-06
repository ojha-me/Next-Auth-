"use server";

import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
	const verificationToken = await getVerificationTokenByToken(token);
	if (!verificationToken) {
		return;
	}
	await db.user.update({
		where: {
			email: verificationToken.email,
		},
		data: {
			emailVerified: new Date(),
		},
	});
};
