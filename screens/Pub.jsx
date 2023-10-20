import React from "react";
import { Text, View } from "react-native";
import Layout from "../components/Layout";
import AppBar from "../components/AppBar";

const Pub = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="Pub" />
    </View>
  );
};

export default Pub;
