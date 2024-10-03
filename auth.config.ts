import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import { loginSchema } from "./schemas";

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedCredentials = loginSchema.safeParse(credentials);
				if (!validatedCredentials.success) {
					return null;
				}
				const { email, password } = validatedCredentials.data;
				const user = await getUserByEmail(email);
				// return null if there is no user or if there is user but no password (oauth)
				if (!user || !user.password) {
					return null;
				}
				const passwordMatch = await bcrypt.compare(password, user.password);
				if (!passwordMatch) {
					return null;
				}
				return user;
			},
		}),
	],
} satisfies NextAuthConfig;
