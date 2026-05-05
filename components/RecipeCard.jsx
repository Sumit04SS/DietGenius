import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Clock01FreeIcons, Fire02Icon } from '@hugeicons/core-free-icons';
import Colors from './shared/Colors';
import { Link } from 'expo-router';

export default function RecipeCard({ recipe }) {
  const recipeJson = recipe?.jsonData;

  return (
    <Link href={'/recipe-detail?recipeId=' + recipe?._id} asChild>
      <TouchableOpacity activeOpacity={0.7} style={{ flex: 1, margin: 5 }}>
        <Image
      source={{
        uri: recipe?.imageUrl && recipe.imageUrl.startsWith("http")
        ? recipe.imageUrl
        : "https://picsum.photos/300"
      }}
          style={{
            width: '100%',
            height: 100,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />

        <View style={{
          padding: 10,
          backgroundColor: Colors.WHITE,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
        }}>
          <Text style={{
            fontSize: 17,
            fontWeight: 'bold',
          }}>
            {recipe?.recipeName}
          </Text>

          <View style={[styles.infoContainer, { gap: 15, marginTop: 6 }]}>
            
            <View style={styles.infoContainer}>
              <HugeiconsIcon icon={Fire02Icon} color={Colors.RED} size={18} />
              <Text style={{ fontSize: 14, color: Colors.GRAY }}>
                {recipeJson?.calories || 0} kCal
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <HugeiconsIcon icon={Clock01FreeIcons} color={Colors.RED} size={18} />
              <Text style={{ fontSize: 14, color: Colors.GRAY }}>
                {recipeJson?.cookTime || 0} Min
              </Text>
            </View>

          </View>
        </View>

      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  }
});