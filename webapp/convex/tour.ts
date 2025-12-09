import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

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

export const getTour = query({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.tourId)
  },
})

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

export const deleteTour = mutation({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    const steps = await ctx.db
      .query("steps")
      .withIndex("by_tour", (q) => q.eq("tourId", args.tourId))
      .collect()

    for (const step of steps) {
      await ctx.db.delete(step._id)
    }

    await ctx.db.delete(args.tourId)
  },
})
