import { View, Text, FlatList } from 'react-native'; 
import React, { useContext, useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { CalendarAdd01Icon } from '@hugeicons/core-free-icons';
import Colors from './shared/Colors';
import Button from './shared/Button'; // ✅ FIX
import { useConvex } from 'convex/react';
import { UserContext } from '../context/UserContext';
import { api } from '../convex/_generated/api';
import moment from 'moment';
import MealPlanCard from './MealPlanCard';
import { RefreshDataContext } from '../context/RefreshDataContext';

export default function TodaysMealPlan({selectedData = null}) {
  const [mealPlan, setMealPlan] = useState([]);
  const convex = useConvex();
  const { user } = useContext(UserContext);
  const {refreshData, setRefreshData} = useContext(RefreshDataContext)
  

  useEffect(() => {
    if (user?._id) {
      GetTodaysMealPlan();
    }
  }, [user,refreshData]);

  const GetTodaysMealPlan = async () => {
    if (!user?._id) return;

    const result = await convex.query(api.MealPlan.GetTodayMealPlan, { // ✅ FIX
      date: selectedData ?? moment().format('DD/MM/YYYY'),
      uid: user._id,
    });

    console.log("--->", result);
    setMealPlan(result);
  };

return (
  <View style={{ marginTop: 15 }}>
{selectedData && <Text>Today's Meal Plan</Text>}

    {mealPlan.length === 0 ? (
      <View style={{
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.WHITE,
        marginTop: 15,
        borderRadius: 15,
      }}>
        <HugeiconsIcon icon={CalendarAdd01Icon} size={40} color={Colors.PRIMARY} />

        <Text style={{
          fontSize: 18,
          color: Colors.GRAY,
          marginBottom: -5
        }}>
          You don't have any meal plan for today
        </Text>

        <Button title={'Create New Meal Plan'} />
      </View>
    ) : (
      <View>
        <FlatList
          data={mealPlan}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MealPlanCard mealPlanInfo={item} refreshData={GetTodaysMealPlan} />
          )}
        />
      </View>
    )}

  </View>
)};