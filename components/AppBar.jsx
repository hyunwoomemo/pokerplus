import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Animated, Platform, Text, TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import styled from "styled-components/native";

const AppBar = ({ bgc = "#ecf2f0", title, back, mode, move, side }) => {
  const navigation = useNavigation();
  return (
    <Animated.View style={Platform.OS === "ios" && { transform: [{ translateY: move }] }}>
      <Appbar.Header style={{ backgroundColor: bgc }} mode={mode}>
        <Appbar.BackAction color="#000" onPress={back ? back : () => navigation.goBack()} />
        <Appbar.Content title={title} color="#000" />
        {side && <Appbar.Content title={side} color="#000" />}
        {/* {right && <AppBar.Content title={title} color="#000" />} */}
        {/* {action && <Appbar.Action icon={action} />} */}
      </Appbar.Header>
    </Animated.View>
  );
};

export default AppBar;
