import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  tours: defineTable({
    name: v.string(),
    description: v.string(),
    userId: v.string(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  steps: defineTable({
    tourId: v.id("tours"),
    stepId: v.string(),
    title: v.string(),
    description: v.string(),
    targetElement: v.string(),
    position: v.string(),
    order: v.number(),
  }).index("by_tour", ["tourId"]),

  analytics: defineTable({
    tourId: v.id("tours"),
    sessionId: v.string(),
    stepId: v.string(),
    event: v.string(),
    timestamp: v.number(),
  })
    .index("by_tour", ["tourId"])
    .index("by_session", ["sessionId"]),
})
