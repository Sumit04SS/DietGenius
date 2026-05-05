import { View, Text, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function HomeHeader() {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      
      {/* Profile Image */}
      <Image
        source={require("./../../assets/images/userIcon.png")}
        style={styles.image}
      />

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hello, 👋</Text>
        <Text style={styles.name}>
          {user?.name || "User"}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,   
        paddingRight: 20,
        paddingTop: 30,
        paddingBottom: 15,
        marginLeft:-20,
        gap:-9
    },

  image: {
    width: 70,
    height: 70,
    borderRadius:40,
  },

  textContainer: {
    marginLeft:6,
  },

  greeting: {
    fontSize: 20,
    color: "#000",
  },

  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
});