import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../components/shared/Colors";
import Input from "../../components/shared/Input";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Dumbbell01Icon,
  PlusSignCircleIcon,
  WeightScaleIcon,
  MaleSymbolIcon,
  FemaleSymbolIcon,
} from "@hugeicons/core-free-icons";
import Button from "./../../components/shared/Button";
import { api } from './../../convex/_generated/api';
import {UserContext} from'./../../context/UserContext'
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import { CalculateCaloriesAI } from "../../services/AiModel";
import Prompt from '../../constants/Prompt';

export default function Preference() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const { user , setUser} = useContext(UserContext);
  const UpdateUserPref = useMutation(api.Users.UpdateUserPref);
  const router = useRouter();

const OnContinue = async () => {
  if (!weight || !height || !gender || !goal) {
    Alert.alert("Fill All Details", "Enter all details to continue");
    return;
  }

    const data = {
    uid: user._id,
    weight: Number(weight),
    height: Number(height),
    gender,
    goal,
  };

  // Calculate Calories using AI

const PROMPT = `
User Data:
${JSON.stringify(data)}

${Prompt.CALORIES_PROMPT}
`;

console.log(PROMPT);

const AIResult = await CalculateCaloriesAI(PROMPT);


let calories = null;
let proteins = null;

// ✅ Use AI result directly
if (AIResult) {
  calories = AIResult.calories;
  proteins = AIResult.proteins;
}

// ✅ Fallback if AI fails
if (!calories || !proteins) {
  console.log("Using fallback calculation");

  const w = Number(weight);
  const h_cm = Number(height) * 30.48;

  calories = 10 * w + 6.25 * h_cm - 5 * 28 + (gender === "Male" ? 5 : -161);
  proteins = w * 2;
}

console.log("Final:", calories, proteins);



  console.log("Sending:", data);

if (!calories || !proteins) {
  Alert.alert("Error", "Calculation failed");
  return;
}

const result = await UpdateUserPref({
  ...data,
  calories: Number(calories),
  proteins: Number(proteins)
});

if (!result) {
  Alert.alert("Error", "Failed to save data");
  return;
}

setUser((prev) => ({
  ...prev,
  ...data,
  calories,
  proteins
}));

router.replace('/(tabs)/Home');

    console.log({ weight, height, gender, goal });
  };

  return (
    <View style={{ padding: 20, backgroundColor: Colors.WHITE, flex: 1 }}>
      {/* Title */}
      <Text style={styles.title}>Tell us about yourself</Text>

      <Text style={styles.subtitle}>
        This helps us create a personalized meal plan
      </Text>

      {/* Inputs */}
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <View style={{ flex: 1, marginRight: 5 }}>
          <Input placeholder="e.g 70" label="Weight (kg)" onChangeText={setWeight} />
        </View>

        <View style={{ flex: 1, marginLeft: 5 }}>
          <Input placeholder="e.g 5.10" label="Height (ft)" onChangeText={setHeight} />
        </View>
      </View>

      {/* Gender */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Gender</Text>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => setGender("Male")}
            style={[
              styles.box,
              gender === "Male" && styles.selectedBox,
            ]}
          >
            <HugeiconsIcon icon={MaleSymbolIcon} size={30} />
            <Text>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGender("Female")}
            style={[
              styles.box,
              gender === "Female" && styles.selectedBox,
            ]}
          >
            <HugeiconsIcon icon={FemaleSymbolIcon} size={30} />
            <Text>Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Goals */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>What's Your Goal?</Text>

        <TouchableOpacity
          onPress={() => setGoal("Weight Loss")}
          style={[
            styles.goalContainer,
            goal === "Weight Loss" && styles.selectedBox,
          ]}
        >
          <HugeiconsIcon icon={WeightScaleIcon} size={28} />
          <View>
            <Text style={styles.goalText}>Weight Loss</Text>
            <Text style={styles.goalSubText}>
              Reduce body fat & get leaner
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGoal("Muscle Gain")}
          style={[
            styles.goalContainer,
            goal === "Muscle Gain" && styles.selectedBox,
          ]}
        >
          <HugeiconsIcon icon={Dumbbell01Icon} size={28} />
          <View>
            <Text style={styles.goalText}>Muscle Gain</Text>
            <Text style={styles.goalSubText}>
              Build muscle & get stronger
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGoal("Weight Gain")}
          style={[
            styles.goalContainer,
            goal === "Weight Gain" && styles.selectedBox,
          ]}
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} size={28} />
          <View>
            <Text style={styles.goalText}>Weight Gain</Text>
            <Text style={styles.goalSubText}>
              Increase healthy body mass
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Button */}
      <View style={{ marginTop: 25 }}>
        <Button title={"Continue"} onPress={OnContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.GRAY,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  box: {
    flex: 1,
    borderWidth: 1,
    padding: 15,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    marginTop: 10,
  },
  goalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  goalSubText: {
    color: Colors.GRAY,
    fontWeight:'800'
  },
  selectedBox: {
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
  },
});