import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  predictions: defineTable({
    userId: v.id("users"),
    fileName: v.string(),
    predictedGenre: v.string(),
    probabilities: v.object({
      blues: v.number(),
      classical: v.number(),
      country: v.number(),
      disco: v.number(),
      hiphop: v.number(),
      jazz: v.number(),
      metal: v.number(),
      pop: v.number(),
      reggae: v.number(),
      rock: v.number(),
    }),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_genre", ["userId", "predictedGenre"])
    .index("by_user_and_created_at", ["userId", "createdAt"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
