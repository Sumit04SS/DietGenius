import { View, Text, Platform, FlatList } from 'react-native';
import React, { useState } from 'react';

import DateSelectionCard from '../../components/DateSelectionCard';
import TodaysMealPlan from '../../components/TodaysMealPlan';
import TodayProgress from '../../components/TodayProgress';
import GenerateRecipeCard from '../../components/GenerateRecipeCard';

export default function Progress() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={() => (
        <View
          style={{
            padding: 20,
            paddingTop: Platform.OS === 'ios' ? 40 : 25,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
            }}
          >
            Progress
          </Text>

          {/* ✅ Date Selector */}
          <DateSelectionCard setSelectedDate={setSelectedDate} />

          {/* ✅ Pass selected date */}
          <TodaysMealPlan selectedData={selectedDate} />

          {/* ✅ Progress */}
          <TodayProgress />

          {/* ✅ Recipe Generator */}
          <GenerateRecipeCard />
        </View>
      )}
    />
  );
}