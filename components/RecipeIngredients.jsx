import { View, Text, FlatList } from 'react-native';
import React from 'react';
import Colors from './shared/Colors';

export default function RecipeIngredients({ recipe }) { // ✅ FIX

  const ingredients = recipe?.jsonData?.ingredients; // ✅ FIX

  return (
    <View style={{ marginTop: 15 }}>

        <View style = {{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
        }}>
            <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            }}>
            Ingredients
            </Text>

            <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            }}>
            {ingredients?.length}
            </Text>
      </View>

      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (

          <View style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>

            {/* LEFT */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>

              <Text style={{
                padding: 7,
                fontSize: 16,
                backgroundColor: Colors.SECONDARY,
                borderRadius: 99,
              }}>
                🍽️
              </Text>

              {/* ✅ FIX */}
              <Text style={{
                fontSize: 17,
                fontWeight: '600'
              }}>
                {item}
              </Text>

            </View>

          </View>

        )}
      />
    </View>
  );
}