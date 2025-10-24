import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
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
    tokensUsed: v.any(), // Dynamic object for different products
    tokensLimit: v.any(), // Dynamic object for different products
    status: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("suspended")
    ),
    country: v.string(),
    stripeCustomerId: v.optional(v.string()),
    lastLogin: v.optional(v.string()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_plan", ["plan"])
    .index("by_status", ["status"]),

  subscriptions: defineTable({
    userId: v.string(), // Reference to user clerkId
    productId: v.string(),
    plan: v.string(),
    price: v.number(),
    status: v.union(
      v.literal("active"),
      v.literal("cancelled"),
      v.literal("expired"),
      v.literal("trial")
    ),
    currentPeriodEnd: v.string(),
    cancelAtPeriodEnd: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_product", ["productId"]),

  transactions: defineTable({
    userId: v.string(), // Reference to user clerkId
    productId: v.string(),
    amount: v.number(),
    currency: v.string(),
    method: v.union(
      v.literal("card"),
      v.literal("paypal"),
      v.literal("transfer")
    ),
    status: v.union(
      v.literal("success"),
      v.literal("failed"),
      v.literal("pending")
    ),
    stripeInvoiceId: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_product", ["productId"]),

  tickets: defineTable({
    userId: v.string(), // Reference to user clerkId
    subject: v.string(),
    productId: v.string(),
    priority: v.union(
      v.literal("high"),
      v.literal("medium"),
      v.literal("low")
    ),
    status: v.union(
      v.literal("open"),
      v.literal("in_progress"),
      v.literal("resolved"),
      v.literal("closed")
    ),
    messages: v.array(
      v.object({
        from: v.union(v.literal("user"), v.literal("admin")),
        content: v.string(),
        timestamp: v.string(),
      })
    ),
    assignedTo: v.optional(v.string()),
    updatedAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_priority", ["priority"]),

  bundles: defineTable({
    userId: v.string(), // Reference to user clerkId
    products: v.array(v.string()),
    price: v.number(),
    discount: v.number(),
    status: v.union(v.literal("active"), v.literal("inactive")),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  metrics: defineTable({
    date: v.string(),
    mrr: v.number(),
    users: v.number(),
    activeUsers: v.number(),
    tokensProcessed: v.number(),
    productBreakdown: v.any(), // Dynamic object for different products
  }).index("by_date", ["date"]),
});
