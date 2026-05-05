import { Text, View, Image } from "react-native";
import Button from "../components/shared/Button";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/FirebaseConfig";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useConvex } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Index() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const convex = useConvex();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (userInfo) => {
    if (!userInfo?.email) return;

    try {
      const userData = await convex.query(api.Users.GetUser, {
        email: userInfo.email.trim().toLowerCase(),
      });

      if (userData) {
        setUser(userData);
        router.replace("/(tabs)/Home"); // ✅ FIXED
      }
    } catch (err) {
      console.log("Convex error:", err);
    }
  });

  return () => unsubscribe();
}, []);

  return (
    <View style={{ flex: 1 }}>

      {/* Background */}
      <Image
        source={require("../assets/images/landing.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />

      {/* Overlay */}
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor: "#0707075e",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 60,
          paddingHorizontal: 20,
        }}
      >

        <View />

        {/* Center Content */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 80, height: 80, marginBottom: 20 }}
          />

          <Text style={{
            color: "white",
            fontSize: 26,
            fontWeight: "bold",
            textAlign: "center",
          }}>
            AI Diet Planner
          </Text>

          <Text style={{
            color: "#ddd",
            fontSize: 16,
            textAlign: "center",
            marginTop: 10,
            lineHeight: 22,
          }}>
            Craft delicious, healthy meal plans tailored just for you.
          </Text>
        </View>

        {/* Button */}
        <View style={{ width: "100%" }}>
          <Button
            title="Get Started"
            onPress={() => router.push("/auth/signin")}
          />
        </View>

      </View>
    </View>
  );
}