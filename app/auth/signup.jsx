import { Text, View, Image, Alert } from "react-native";
import React, { useState, useContext } from "react";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { Link, useRouter } from "expo-router";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/FirebaseConfig";

// Context
import { UserContext } from "../../context/UserContext";

export default function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createNewUser = useMutation(api.Users.CreateNewUser);

  const { setUser } = useContext(UserContext);

  const router = useRouter();

  const onSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing Fields", "Enter all field values");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUser = userCredential.user;
      const cleanemail = email.trim().toLowerCase();

      if (firebaseUser) {
        const result = await createNewUser({
          name: name,
          email: cleanemail,
        });

        setUser(result);
        console.log("Saved user:", result);

        // ✅ CORRECT NAVIGATION
        router.replace("/Home");
      }

      Alert.alert("Success", "Account created successfully!");

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
        Create Account
      </Text>

      <View style={{ marginTop: 20, width: "100%" }}>
        <Input placeholder="Full Name" onChangeText={setName} />
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input placeholder="Password" password={true} onChangeText={setPassword} />
      </View>

      <View style={{ marginTop: 15, width: "100%" }}>
        <Button title="Create Account" onPress={onSignUp} />

        <Text style={{ textAlign: "center", fontSize: 16, marginTop: 15 }}>
          Already have an account?
        </Text>

        <Link href="/auth/signin">
          <Text style={{ textAlign: "center", fontSize: 16, marginTop: 5, fontWeight: "bold" }}>
            Sign In
          </Text>
        </Link>
      </View>
    </View>
  );
}