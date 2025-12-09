import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get all tours for a user
export const getTours = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tours")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect()
  },
})

// Get single tour
export const getTour = query({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.tourId)
  },
})

// Create tour
export const createTour = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const tourId = await ctx.db.insert("tours", {
      name: args.name,
      description: args.description,
      userId: args.userId,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    return tourId
  },
})

// Update tour
export const updateTour = mutation({
  args: {
    tourId: v.id("tours"),
    name: v.string(),
    description: v.string(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { tourId, ...updates } = args
    await ctx.db.patch(tourId, {
      ...updates,
      updatedAt: Date.now(),
    })
  },
})

// Delete tour
export const deleteTour = mutation({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    // Delete all steps associated with this tour
    const steps = await ctx.db
      .query("steps")
      .withIndex("by_tour", (q) => q.eq("tourId", args.tourId))
      .collect()

    for (const step of steps) {
      await ctx.db.delete(step._id)
    }

    // Delete the tour
    await ctx.db.delete(args.tourId)
  },
})
