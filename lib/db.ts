import { PrismaClient } from "@prisma/client";

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// in dev nextjs will hotreload any time you save and a new PrismaClient will be created
// and a lot of PrismaClient instances will be created and cause a memory leak
