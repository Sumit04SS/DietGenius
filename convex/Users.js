import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ✅ CREATE USER
export const CreateNewUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!existing) {
      const data = {
        name: args.name,
        email: args.email,
        credits: 10,
      };

      const id = await ctx.db.insert("users", data);
      return { ...data, _id: id }; // ✅ IMPORTANT
    }

    return existing;
  },
});

// ✅ GET USER
export const GetUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    return user ?? null;
  },
});

// ✅ UPDATE PREFERENCES
export const UpdateUserPref = mutation({
  args: {
    uid: v.id("users"),
    height: v.number(),
    weight: v.number(),
    gender: v.string(),
    goal: v.string(),
    calories:v.optional(v.number()),
    proteins:v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.uid, {
      height: args.height,
      weight: args.weight,
      gender: args.gender,
      goal: args.goal,
      calories:args.calories,
      proteins:args.proteins 
    });

    return true;
  },
});