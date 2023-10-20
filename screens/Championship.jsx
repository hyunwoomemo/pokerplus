import React from "react";
import { Text, View } from "react-native";
import Layout from "../components/Layout";
import { Appbar } from "react-native-paper";
import AppBar from "../components/AppBar";

const Championship = ({ navigation }) => {
  return (
    // <Layout>
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="Championship" />
    </View>
    // </Layout>
  );
};

export default Championship;
