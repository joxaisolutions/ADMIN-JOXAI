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
    email: v.string(),
    name: v.string(),
    productId: v.string(),
    subscriptionPlan: v.union(
      v.literal("free"),
      v.literal("basic"),
      v.literal("pro"),
      v.literal("premium"),
      v.literal("enterprise")
    ),
    country: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      clerkId: `user_${Date.now()}`, // Temporary until Clerk creates the user
      email: args.email,
      name: args.name,
      productId: args.productId,
      subscriptionPlan: args.subscriptionPlan,
      products: [args.productId],
      tokensUsed: {},
      tokensLimit: {},
      status: "active",
      country: args.country,
      lastLogin: new Date().toISOString(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    productId: v.optional(v.string()),
    subscriptionPlan: v.optional(
      v.union(
        v.literal("free"),
        v.literal("basic"),
        v.literal("pro"),
        v.literal("premium"),
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
    country: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deleteUser = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userId);
  },
});
