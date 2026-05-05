import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import Colors from '../../components/shared/Colors';
import Button from '../../components/shared/Button';
import Prompt from '../../constants/Prompt';
import { GenerateRecipeOptionsAiModel } from "../../services/AiModel";
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UserContext } from "../../context/UserContext";
import { useRouter } from 'expo-router';
import { getFoodImage } from "../../services/ImageApi";

export default function GenerateAiRecipe() {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const CreateRecipe = useMutation(api.Recipes.CreateRecipe);
  const router = useRouter();

  // ✅ GENERATE AI RECIPES
const GenerateRecipeOptions = async () => {
  if (!input) return;

  setLoading(true);

  try {
    const PROMPT = input + "\n" + Prompt.GENERATE_RECIPE_OPTION_PROMPT;

    const raw = await GenerateRecipeOptionsAiModel(PROMPT);

    let parsed = raw;

    if (typeof raw === "string") {
      try {
        parsed = JSON.parse(raw);
      } catch (e) {
        console.log("JSON parse error:", e, raw);
        alert("Invalid AI response. Try again.");
        return;
      }
    }

    if (Array.isArray(parsed)) {
      setRecipes(parsed);
    } else {
      setRecipes([]);
    }

  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// ✅ OUTSIDE (VERY IMPORTANT)
const SaveRecipe = async (item) => {
  try {
    if (!user?._id) return;

    const imageUrl =
      (await getFoodImage(item.recipeName)) ||
      "https://picsum.photos/600/400";

    const updatedItem = {
      ...item,
      calories: item.calories || Math.floor(Math.random() * 200 + 200)
    };

    const result = await CreateRecipe({
      uid: user._id,
      jsonData: updatedItem,
      recipeName: updatedItem.recipeName,
      imageUrl
    });

    router.push({
      pathname: "/recipe-detail",
      params: { recipeId: result }
    });

  } catch (e) {
    console.log(e);
  }
};

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>
        AI Recipe Generator
      </Text>

      <Text style={styles.subtitle}>
        Generate personalized recipes using AI
      </Text>

      <TextInput
        style={styles.textArea}
        value={input}
        onChangeText={setInput}
        placeholder="Enter ingredients or recipe name"
      />

      <Button
        title="Generate Recipe"
        onPress={GenerateRecipeOptions}
        loading={loading}
      />

      {recipes.length > 0 && (
        <View style={{ marginTop: 25 }}>
          
          <Text style={styles.sectionTitle}>
            Select Recipe
          </Text>

          {recipes.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => SaveRecipe(item)}
            >
              <Text style={styles.cardTitle}>
                😋 {item.recipeName}
              </Text>

              <Text style={styles.cardDesc} numberOfLines={2}>
                {item.description}
              </Text>
            </TouchableOpacity>
          ))}

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#F8F8F8"
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4
  },

  subtitle: {
    color: "#666",
    fontSize: 15,
    marginBottom: 12
  },

  textArea: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 12,
    fontSize: 16,
    height: 140,
    textAlignVertical: 'top',
    backgroundColor: "#fff",
    marginBottom: 10
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#eee",
    height: 110,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6
  },

  cardDesc: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20
  }
});