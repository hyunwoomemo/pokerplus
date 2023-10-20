import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Appbar } from "react-native-paper";

const AppBar = ({ bgc = "#fff", title, back, type }) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: bgc }}>
      <Appbar.BackAction onPress={back ? back : () => navigation.goBack()} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default AppBar;
