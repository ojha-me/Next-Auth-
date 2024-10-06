import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { db } from "./lib/db";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
	//https://next-auth.js.org/configuration/callbacks

	// custom pages

	pages: {
		signIn: "/settings",
		signOut: "/sign-in",
		error: "/error",
		// verifyRequest: "/auth/verify-request",
		// newUser: "/auth/new-user",
	},

	//async functions don't return anything
	// used for audit logs, handle side effects etc
	// example if a new user do something
	events: {
		// if this is ever triggered, it means that someone used oauth
		linkAccount: async ({ user }) => {
			await db.user.update({
				where: {
					id: user.id,
				},
				data: {
					emailVerified: new Date(), // stores date when email was verified, for oauth we can assume its verified
				},
			});
		},
	},
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
				session.user.role = token.role as "ADMIN" | "USER";
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
