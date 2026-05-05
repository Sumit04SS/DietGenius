import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { UserContext } from "../context/UserContext";
import { RefreshDataContext } from "../context/RefreshDataContext";
import { useState } from "react";


export default function RootLayout() {

  const convex = new ConvexReactClient(
    process.env.EXPO_PUBLIC_CONVEX_URL!,
    { unsavedChangesWarning: false }
  );

  const [user, setUser] = useState(null);
  const [refreshData, setRefreshData] = useState();

  return (
    <ConvexProvider client={convex}>
      <UserContext.Provider value={{ user, setUser }}>
        <RefreshDataContext.Provider value={{refreshData, setRefreshData}}>
        {/* ✅ DO NOT define screens manually */}
        <Stack screenOptions={{ headerShown: false }} />
        </RefreshDataContext.Provider>

      </UserContext.Provider>
    </ConvexProvider>
  );
}