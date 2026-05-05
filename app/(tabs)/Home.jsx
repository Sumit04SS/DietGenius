import { View, Text, FlatList } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "expo-router";
import HomeHeader from "../../components/shared/HomeHeader";
import TodayProgress from "../../components/TodayProgress";
import GenerateRecipeCard from "../../components/GenerateRecipeCard";
import TodaysMealPlan from "../../components/TodaysMealPlan";
export default function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const hasRedirected = useRef(false); // ✅ inside component

  useEffect(() => {
    if (!user || hasRedirected.current) return;

    if (!user.weight) {
      hasRedirected.current = true;
      router.replace("/preference");
    }
  }, [user]);

  return (
    <FlatList
    data={[]}
    renderItem={()=>null}
    ListHeaderComponent={
    <View style={{
      padding:20
    }}>
      <HomeHeader />
      <TodayProgress />
      <GenerateRecipeCard />
      <TodaysMealPlan />
    </View>}
    ></FlatList>
  );
}