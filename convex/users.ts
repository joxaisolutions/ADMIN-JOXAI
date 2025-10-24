import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const create = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    plan: v.union(
      v.literal("free"),
      v.literal("creator"),
      v.literal("pro"),
      v.literal("business"),
      v.literal("enterprise")
    ),
    products: v.array(v.string()),
    tokensUsed: v.object({}),
    tokensLimit: v.object({}),
    status: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("suspended")
    ),
    country: v.string(),
    stripeCustomerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      ...args,
      lastLogin: new Date().toISOString(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("users"),
    data: v.object({
      name: v.optional(v.string()),
      plan: v.optional(
        v.union(
          v.literal("free"),
          v.literal("creator"),
          v.literal("pro"),
          v.literal("business"),
          v.literal("enterprise")
        )
      ),
      status: v.optional(
        v.union(
          v.literal("active"),
          v.literal("inactive"),
          v.literal("suspended")
        )
      ),
      tokensUsed: v.optional(v.object({})),
      tokensLimit: v.optional(v.object({})),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, args.data);
  },
});

export const updateLastLogin = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    
    if (user) {
      await ctx.db.patch(user._id, {
        lastLogin: new Date().toISOString(),
      });
    }
  },
});
