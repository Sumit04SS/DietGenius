import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.optional(v.string()),
    weight: v.optional(v.number()),
    height: v.optional(v.number()),
    goal: v.optional(v.string()),
    calories:v.optional(v.number()),
    proteins:v.optional(v.number()),
    gender: v.optional(v.string()),
    credits: v.number()
  }),

  recipes: defineTable({
    jsonData: v.any(),
    uid: v.id('users'),
    recipeName: v.string(),
    imageUrl: v.string()

  }),

  mealPlan:defineTable({
    recipeId:v.id('recipes'),
    date:v.string(),
    mealType:v.string(),
    uid:v.id('users') ,
    status:v.optional(v.boolean()), 
    calories:v.optional(v.number())
  })

});

