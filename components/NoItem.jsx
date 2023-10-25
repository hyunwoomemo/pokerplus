import React from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const NoItem = ({ text }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", gap: 40, marginTop: 100 }}>
      <AntDesign name="warning" size={36} color="tomato" />
      <Text style={{ fontSize: 20, color: "gray" }}>{text}</Text>
    </View>
  );
};

export default NoItem;
