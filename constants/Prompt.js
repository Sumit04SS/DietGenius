export default {

CALORIES_PROMPT: `
You are a nutrition calculator.

Based on:
- Weight
- Height
- Gender
- Goal
- Age = 28

Return ONLY valid JSON.
No explanation.
No text.

{
  "calories": number,
  "proteins": number
}
`,

GENERATE_RECIPE_OPTION_PROMPT: `
Generate EXACTLY 3 recipes.

STRICT RULES:
- Return ONLY JSON array
- No explanation
- No markdown
- No extra text
- All numbers must be numbers (NOT strings)

Each recipe MUST include:
- recipeName (with emoji)
- description (2 short lines)
- ingredients (array of strings)
- calories (number)
- proteins (number)
- cookTime (number in minutes)
- serveTo (number)

Return format:
[
  {
    "recipeName": "Paneer Curry 🍛",
    "description": "Rich and creamy curry. Perfect for dinner.",
    "ingredients": ["Paneer", "Tomato"],
    "calories": 250,
    "proteins": 40,
    "cookTime": 30,
    "serveTo": 2
  }
]
`,

GENERATE_COMPLETE_RECIPE_PROMPT: `
Generate a complete recipe.

STRICT RULES:
- Return ONLY valid JSON
- No explanation
- No markdown
- No text outside JSON
- All numbers must be numbers

{
  "recipeName": "Paneer Curry 🍛",
  "description": "Rich and creamy curry",
  "ingredients": [
    { "name": "Paneer", "quantity": "200g" }
  ],
  "steps": [
    "Heat oil",
    "Add spices",
    "Cook paneer"
  ],
  "calories": 300,
  "proteins": 40,
  "cookTime": 30,
  "serveTo": 2,
  "category": "Dinner"
}
`
};