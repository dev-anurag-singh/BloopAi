import { initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";

// Create TRPC context
export const createTRPCContext = cache(async () => {
  return { userId: "user_123" };
});

// Initialize TRPC

const t = initTRPC.create({
  transformer: superjson,
});

// Base router and procedure helpers

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
