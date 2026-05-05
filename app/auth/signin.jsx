import { Text, View, Image, Alert } from "react-native";
import React, { useState, useContext } from "react";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { Link, useRouter } from "expo-router";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/FirebaseConfig";

import { UserContext } from "../../context/UserContext";

// ✅ ADD THESE
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const convex = useConvex(); // ✅

  const onSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Enter all field values");
      return;
    }

    try {
      // ✅ FIREBASE LOGIN
      await signInWithEmailAndPassword(auth, email, password);

      const cleanEmail = email.trim().toLowerCase();

      // ✅ GET USER FROM CONVEX
      let userData = await convex.query(api.Users.GetUser, {
        email: cleanEmail,
      });

      // ✅ IF NOT EXISTS → CREATE USER
      if (!userData) {
        userData = await convex.mutation(api.Users.CreateNewUser, {
          name: "User",
          email: cleanEmail,
        });
      }

      console.log("LOGIN USER:", userData);

      // ✅ IMPORTANT → STORE FULL USER (_id included)
      setUser(userData);

      // ✅ NAVIGATION (KEEP SAME)
      router.replace("/(tabs)/Home");

    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 150, height: 150, marginTop: 60 }}
      />

      <Text style={{ fontSize: 35, fontWeight: "bold", marginTop: 20 }}>
        Welcome Back
      </Text>

      <View style={{ marginTop: 20, width: "100%" }}>
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input placeholder="Password" password={true} onChangeText={setPassword} />
      </View>

      <View style={{ marginTop: 15, width: "100%" }}>
        <Button title="Sign In" onPress={onSignIn} />

        <Text style={{ textAlign: "center", fontSize: 16, marginTop: 15 }}>
          Don't have an account
        </Text>

        <Link href="/auth/signup">
          <Text style={{ textAlign: "center", fontSize: 16, marginTop: 5, fontWeight: "bold" }}>
            Create New Account
          </Text>
        </Link>
      </View>
    </View>
  );
}