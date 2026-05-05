import { View, Text, Platform, FlatList, Modal } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import RecipeIntro from '../../components/RecipeIntro';
import Colors from '../../components/shared/Colors';
import RecipeIngredients from '../../components/RecipeIngredients';
import Button from '../../components/shared/Button';
import AddToMealActionSheet from '../../components/AddToMealActionSheet';
import React, { useState } from 'react';
import RecipeSteps from '../../components/RecipeSteps';

export default function RecipeDetail() {
  const { recipeId } = useLocalSearchParams();

  // ✅ FIX: added useState
  const [showSheet, setShowSheet] = useState(false);

  const recipe = useQuery(
    api.Recipes.GetRecipeById,
    recipeId ? { id: recipeId } : "skip"
  );

  if (!recipe) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={() => (
        <View style={{
          flex: 1,
          padding: 20,
          paddingTop: Platform.OS === 'ios' ? 40 : 30,
          backgroundColor: Colors.WHITE,
        }}>

          {/* ✅ Components */}
          <RecipeIntro recipe={recipe} />
          <RecipeIngredients recipe={recipe} />
          <RecipeSteps recipe={recipe} />

          {/* ✅ Button */}
          <View>
            <Button
              title={'Add to Meal Plan'}
              onPress={() => setShowSheet(true)}
            />
          </View>

          {/* ✅ Modal instead of ActionSheet */}
          <Modal visible={showSheet} animationType="slide">
            <AddToMealActionSheet
              recipeDetail={recipe}
              hideActionSheet={() => setShowSheet(false)}
            />
          </Modal>

        </View>
      )}
    />
  );
}