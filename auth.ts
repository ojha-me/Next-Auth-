import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
	//https://next-auth.js.org/configuration/callbacks

	callbacks: {
		// get access to the user data - first get the id from token, then
		// get the user from the database, then add the role to the token
		jwt: async ({ token }) => {
			if (token.sub) {
				const user = await getUserById(token.sub);
				if (user) {
					token.role = user.role;
				}
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (token.sub && session.user) {
				session.user.id = token.sub;
				session.user.role = token.role;
			}
			return session;
		},
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	...authConfig,
});

// with prisma we cannot use the database session as it doesnt work in edge?? hence didnt use it
// we use jwt session instead as in the doc
