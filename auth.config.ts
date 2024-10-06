import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import { loginSchema } from "./schemas";

export default {
	providers: [
		GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
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
