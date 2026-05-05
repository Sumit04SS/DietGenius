// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { Platform } from "react-native";
import { 
  getAuth, 
  initializeAuth, 
  getReactNativePersistence 
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY, // ✅ fixed
  authDomain: "aidietplanner-6e3b3.firebaseapp.com",
  projectId: "aidietplanner-6e3b3",
  storageBucket: "aidietplanner-6e3b3.appspot.com",
  messagingSenderId: "360979599955",
  appId: "1:360979599955:web:038889bd7906c40d8feca6",
};

const app = initializeApp(firebaseConfig);

// ✅ Auth setup for Expo
export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });