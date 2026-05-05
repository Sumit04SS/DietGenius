import { View, TextInput, Text } from "react-native";

export default function Input({ placeholder, password = false, onChangeText,label='' }) {
  return (
      <View style={{
        marginTop:15
      }}>
        <Text style={{
          fontWeight:'medium',
          fontSize: 18
        }}>{label}</Text>
        <TextInput placeholder={placeholder}
        secureTextEntry = {password}
        onChangeText={(value) => onChangeText(value)}
        style ={{
            padding:15,
            borderWidth:1,
            borderRadius:10,
            fontSize:18,
            width: '100%',
            paddingVertical:20,
            marginTop:2

        }}
        />
      </View>
  );
}
