import { PrismaClient } from "./client/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export * from "./client/client";

// Creates a singleton instance of the Prisma client
export default new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL ?? "--hub-database-url--",
}).$extends(withAccelerate()) as PrismaClient;
