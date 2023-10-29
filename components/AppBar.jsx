import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Animated, View } from "react-native";
import { Appbar } from "react-native-paper";

const AppBar = ({ bgc = "#ecf2f0", title, back, mode, move }) => {
  const navigation = useNavigation();
  return (
    <Animated.View style={{ transform: [{ translateY: move }] }}>
      <Appbar.Header style={{ backgroundColor: bgc }} mode={mode}>
        <Appbar.BackAction color="#000" onPress={back ? back : () => navigation.goBack()} />
        <Appbar.Content title={title} color="#000" />
      </Appbar.Header>
    </Animated.View>
  );
};

export default AppBar;
