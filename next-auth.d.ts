// .d.ts files (Declaration files):
// - Contain only type information, no implementation
// - Used to describe the shape of existing JavaScript code
// - Don't produce any JavaScript output when compiled
// - Often used for defining types for libraries or modules
// - Can be used to augment existing types (like we're doing here with NextAuth)

// .ts files:
// - Contain both TypeScript code and type information
// - Include actual implementation and logic
// - Compiled to JavaScript for runtime execution
// - Used for writing application code

import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
	role: "ADMIN" | "USER";
};

declare module "next-auth" {
	interface Session {
		user: {
			role: "ADMIN" | "USER";
		} & DefaultSession["user"];
	}
}
