import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "./db";

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
