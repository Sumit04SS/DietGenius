import {View, Text, Platform, FlatList} from 'react-native'
import React from 'react'
import GenerateRecipeCard from '../../components/GenerateRecipeCard'
import { useQuery } from 'convex/react';
import {api} from '../../convex/_generated/api'
import RecipeCard from '../../components/RecipeCard';

export default function Meals() {
  
  const recipesList = useQuery(api.Recipes.GetAllRecipes)
  console.log(recipesList)

  return (
    <View style = {{
      padding:20,
      paddingTop: Platform.OS == 'ios' ? 40 :30,
      marginTop:30,
    }}>
        <Text style = {{
          fontSize:25,
          fontWeight:'bold',

        }}>Discover Recipes </Text>

        <GenerateRecipeCard />

        <View>
          <FlatList
          data={recipesList}
          numColumns={2}
          renderItem={({item}) => (
            <RecipeCard recipe={item} />
          )}
          
          />
        </View>
    </View>
  )
}