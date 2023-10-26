import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";

const AppBar = ({ bgc = "#ecf2f0", title, back, mode }) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: bgc }} mode={mode}>
      <Appbar.BackAction color="#000" onPress={back ? back : () => navigation.goBack()} />
      <Appbar.Content title={title} color="#000" />
    </Appbar.Header>
  );
};

export default AppBar;
