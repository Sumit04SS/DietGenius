import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import Colors from "./Colors";

export default function Button({ title, onPress, loading }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading} // ✅ prevent multiple clicks
      style={{
        padding: 13,
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        borderRadius: 10,
        marginTop: 20,
        opacity: loading ? 0.7 : 1, // ✅ visual feedback
      }}
    >
      {loading ? (
        <ActivityIndicator
          color={Colors.WHITE}
          style={{ alignSelf: "center" }} // ✅ center spinner
        />
      ) : (
        <Text
          style={{
            fontSize: 18,
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}