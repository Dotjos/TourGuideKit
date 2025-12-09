import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const trackEvent = mutation({
  args: {
    tourId: v.id("tours"),
    sessionId: v.string(),
    stepId: v.string(),
    event: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("analytics", {
      ...args,
      timestamp: Date.now(),
    })
  },
})

export const getTourAnalytics = query({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    const events = await ctx.db
      .query("analytics")
      .withIndex("by_tour", (q) => q.eq("tourId", args.tourId))
      .collect()

    const sessions = new Set(events.map((e) => e.sessionId)).size
    const completedSessions = new Set(
      events.filter((e) => e.event === "completed").map((e) => e.sessionId)
    ).size
    const skippedCount = events.filter((e) => e.event === "skipped").length

    const stepBreakdown = events.reduce(
      (acc, event) => {
        if (!acc[event.stepId]) {
          acc[event.stepId] = { started: 0, completed: 0, skipped: 0 }
        }
        if (event.event === "started") acc[event.stepId].started++
        if (event.event === "completed") acc[event.stepId].completed++
        if (event.event === "skipped") acc[event.stepId].skipped++
        return acc
      },
      {} as Record<
        string,
        { started: number; completed: number; skipped: number }
      >
    )

    return {
      totalSessions: sessions,
      completedSessions,
      completionRate: sessions > 0 ? (completedSessions / sessions) * 100 : 0,
      skippedCount,
      stepBreakdown,
      recentEvents: events.slice(-50).reverse(),
    }
  },
})
