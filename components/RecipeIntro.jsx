import { View, Text, Image, Platform, StyleSheet } from 'react-native';
import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Dumbbell01Icon, Fire03Icon, PlusSignSquareIcon, ServingFoodIcon, TimeQuarter02Icon } from '@hugeicons/core-free-icons';
import Colors from './shared/Colors';

export default function RecipeIntro({ recipe }) {

  const RecipeJson = recipe?.jsonData;

  return (
    <View style={{
      padding: 20,
      paddingTop: Platform.OS === 'ios' ? 40 : 30,
    }}>

      <Image
        source={{ uri: recipe?.imageUrl }}
        style={{
          width: "100%",
          height: 220,
          borderRadius: 15,
          marginTop: 15,
        }}
      />

      <View style={{
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        
        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          flex: 1,
          marginRight: 10,
        }}>
          {recipe?.recipeName}
        </Text>

        <HugeiconsIcon 
          icon={PlusSignSquareIcon} 
          size={32} 
          color={Colors.PRIMARY} 
        />
      </View>
      
      <Text style={{
        marginTop: 10,
        fontSize: 15,
        color: "#555",
        lineHeight: 22
      }}>
        {RecipeJson?.description}
      </Text>

      <View style={{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
      }}>

        <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={Fire03Icon} color={Colors.PRIMARY} size={27} />
          <Text style={styles.subText}>Calories</Text>
          <Text style={styles.count}>{RecipeJson?.calories}</Text>
        </View>

        { <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={Dumbbell01Icon} color={Colors.PRIMARY} size={27} />
          <Text style={styles.subText}>Proteins</Text>
          <Text style={styles.count}>{RecipeJson?.proteins}</Text>
        </View>}

        <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={TimeQuarter02Icon} color={Colors.PRIMARY} size={27} />
          <Text style={styles.subText}>Time</Text>
          <Text style={styles.count}>{ RecipeJson?.cookTime? `${RecipeJson.cookTime} Min`: "N/A"} </Text>
        </View>

        <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={ServingFoodIcon} color={Colors.PRIMARY} size={27} />
          <Text style={styles.subText}>Serve</Text>
          <Text style={styles.count}>{RecipeJson?.serveTo}</Text>
        </View>

      </View>
    </View>
  );
}

// ✅ FIX: moved outside component
const styles = StyleSheet.create({
propertiesContainer: {
  alignItems: 'center',
  backgroundColor: '#fbf5ff',
  paddingVertical: 10,   // 🔥 better vertical spacing
  borderRadius: 12,
  flex: 1,
  marginHorizontal: 4,   // 🔥 spacing between cards
},
subText: {
  fontSize: 12,          // 🔥 prevents "Calorie s"
  color: "#777",
  marginTop: 4,
},

count: {
  fontSize: 16,
  color: Colors.PRIMARY,
  fontWeight: 'bold',
  marginTop: 2,
},
});