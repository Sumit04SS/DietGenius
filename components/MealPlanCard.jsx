import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'; // ✅ FIX
import React, { useContext } from 'react';
import Colors from './shared/Colors';
import { CheckmarkSquare02Icon, SquareIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native'; // ✅ FIX
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api'; // ✅ FIX
import {RefreshDataContext} from './../context/RefreshDataContext'

export default function MealPlanCard({ mealPlanInfo }) {

  const updateStatus = useMutation(api.MealPlan.updateStatus);
  const {refreshData, setRefreshData} = useContext(RefreshDataContext)

  const onCheck = async (status) => {
    await updateStatus({
      id: mealPlanInfo?.mealPlan?._id,
      status: status,
      calories:mealPlanInfo?.recipe?.jsonData?.calories
    });

    Alert.alert('Great!', 'Status Updated!');
    setRefreshData(Date.now());
  };

  return (
    <View style={{
      padding: 10,
      flexDirection: 'row',
      gap: 10,
      backgroundColor: Colors.WHITE,
      borderRadius: 15,
      marginTop: 10,
    }}>
      
      <Image 
        source={{ uri: mealPlanInfo?.recipe?.imageUrl || "https://picsum.photos/200" }}
        style={{
          width: 70,
          height: 70,
          borderRadius: 15
        }}
      />

      <View style={{ flex: 1 }}>
        
        <Text style={styles.mealTypeText}>
          {mealPlanInfo?.mealPlan?.mealType}
        </Text>

        <Text style={styles.recipeName}>
          {mealPlanInfo?.recipe?.recipeName}
        </Text>

        <Text style={styles.calories}>
          {mealPlanInfo?.recipe?.jsonData?.calories || "N/A"} kcal
        </Text>

        {/* ✅ FIXED BUTTON */}
        <View style={{ marginTop: 8 }}>
          {mealPlanInfo?.mealPlan?.status !== true ? (
            <TouchableOpacity onPress={() => onCheck(true)}>
              <HugeiconsIcon icon={SquareIcon} size={26} color={Colors.GRAY} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onCheck(false)}>
              <HugeiconsIcon icon={CheckmarkSquare02Icon} size={26} color={Colors.GREEN} />
            </TouchableOpacity>
          )}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mealTypeText: {
    backgroundColor: Colors.SECONDARY,
    color: Colors.PRIMARY,
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 99,
    alignSelf: 'flex-start',
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calories: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
    color: '#008000'
  }
});