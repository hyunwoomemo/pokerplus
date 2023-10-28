import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { footerIcon } from "../source";

const CustomTabBar = ({ state, descriptors, navigation, options }) => {
  const icons = (src, options) => {
    return (
      <View
        style={
          options?.active
            ? {
                backgroundColor: "#ecf2f0",
                padding: 12,
                borderRadius: 20,
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 5,
                shadowColor: "#000",
              }
            : {
                padding: 12,
              }
        }
      >
        <Image source={{ uri: src }} width={24} height={24} resizeMode="contain" />
      </View>
    );
  };
  return (
    <View style={{ flexDirection: "row", backgroundColor: "#ecf2f0", paddingVertical: 5, paddingBottom: 20 }}>
      {state.routes.map((route, index) => {
        if (index < 5) {
          // Display only the first 4 items
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              if (route.name === "Pub" || route.name === "Championship") {
                Alert.alert("준비 중입니다.");
              } else {
                navigation.navigate(route.name);
              }
            }
          };

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
              {isFocused ? icons(footerIcon.active[route.name], { active: true }) : icons(footerIcon.basic[route.name])}
            </TouchableOpacity>
          );
        } else {
          return null; // Hide the other items
        }
      })}
    </View>
  );
};

export default CustomTabBar;
