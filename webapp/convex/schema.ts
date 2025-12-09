import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  // Tours table
  tours: defineTable({
    name: v.string(),
    description: v.string(),
    userId: v.string(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  // Steps table
  steps: defineTable({
    tourId: v.id("tours"),
    stepId: v.string(), // unique identifier for each step
    title: v.string(),
    description: v.string(),
    targetElement: v.string(), // CSS selector
    position: v.string(), // top, bottom, left, right
    order: v.number(), // step order (0-based)
  }).index("by_tour", ["tourId"]),

  // Analytics table
  analytics: defineTable({
    tourId: v.id("tours"),
    sessionId: v.string(),
    stepId: v.string(),
    event: v.string(), // started, completed, skipped
    timestamp: v.number(),
  })
    .index("by_tour", ["tourId"])
    .index("by_session", ["sessionId"]),
})
