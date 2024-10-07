import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/password-token";

export const generateVerificationToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

	const existingVerificationToken = await getVerificationTokenByEmail(email);

	if (existingVerificationToken) {
		await db.verificationToken.delete({
			where: {
				id: existingVerificationToken.id,
			},
		});
	}
	const verificationToken = await db.verificationToken.create({
		data: {
			email,
			token,
			expires,
		},
	});
	return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

	const existingPasswordResetToken = await getPasswordResetTokenByEmail(email);

	if (existingPasswordResetToken) {
		await db.passwordResetToken.delete({
			where: {
				id: existingPasswordResetToken.id,
			},
		});
	}
	const passwordResetToken = await db.passwordResetToken.create({
		data: {
			email,
			token,
			expires,
		},
	});
	return passwordResetToken;
};
