import React from "react";
import { Text, View } from "react-native";

const Error = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>에러가 발생했습니다 😥</Text>
    </View>
  );
};

export default Error;
