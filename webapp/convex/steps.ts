import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get all steps for a tour
export const getSteps = query({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("steps")
      .withIndex("by_tour", (q) => q.eq("tourId", args.tourId))
      .order("asc")
      .collect()
  },
})

// Create step
export const createStep = mutation({
  args: {
    tourId: v.id("tours"),
    stepId: v.string(),
    title: v.string(),
    description: v.string(),
    targetElement: v.string(),
    position: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const stepId = await ctx.db.insert("steps", args)
    return stepId
  },
})

// Update step
export const updateStep = mutation({
  args: {
    id: v.id("steps"),
    title: v.string(),
    description: v.string(),
    targetElement: v.string(),
    position: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    await ctx.db.patch(id, updates)
  },
})

// Delete step
export const deleteStep = mutation({
  args: { id: v.id("steps") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

// Reorder steps
export const reorderSteps = mutation({
  args: {
    updates: v.array(
      v.object({
        id: v.id("steps"),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const update of args.updates) {
      await ctx.db.patch(update.id, { order: update.order })
    }
  },
})
