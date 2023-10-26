import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const NoItem = ({ text }) => {
  return (
    <View style={{ flex: 1, gap: 20, alignItems: "center", justifyContent: "center" }}>
      <AntDesign name="warning" size={150} color="gray" />
      <Text style={{ fontSize: 20, color: "#000" }}>{text}</Text>
    </View>
  );
};

export default NoItem;
