import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisma = db





// if(process.env.NODE_ENV !== "development") globalThis.prisma = db
// if (process.env.NODE_ENV !== "test") globalThis.prisma = db;