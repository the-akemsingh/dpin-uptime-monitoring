import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "node:url";
import path from "node:path";

const currentFileDir = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.resolve(currentFileDir, "../.env") });

const databaseUrl = process.env.DATABASE_URL;

if (typeof databaseUrl !== "string" || databaseUrl.length === 0) {
	throw new Error(
		"DATABASE_URL is not set. Define it in packages/db/.env or your shell environment.",
	);
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
export const prismaClient = new PrismaClient({ adapter });
