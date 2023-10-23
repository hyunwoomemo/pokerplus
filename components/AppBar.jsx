import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Appbar } from "react-native-paper";

const AppBar = ({ bgc = "#fff", title, back, mode, right }) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: bgc }} mode={mode}>
      <Appbar.BackAction color="#000" onPress={back ? back : () => navigation.goBack()} />
      <Appbar.Content title={title} color="#000" />
      {right && <Appbar.Content title={right} titleStyle={{ fontSize: 16, marginLeft: "auto", paddingRight: 25 }} />}
    </Appbar.Header>
  );
};

export default AppBar;
