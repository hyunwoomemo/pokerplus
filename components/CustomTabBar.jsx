import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { footerIcon } from "../source";

const CustomTabBar = ({ state, descriptors, navigation, options }) => {
  const icons = (src, options) => {
    return (
      <View
        style={
          options?.active
            ? {
                backgroundColor: "#e8f0ee",
                padding: 12,
                borderRadius: 20,
                shadowOffset: {
                  width: 3,
                  height: 2,
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
    <View style={{ flexDirection: "row", backgroundColor: "#e8f0ee", paddingVertical: 5, paddingBottom: 20 }}>
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
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
              {isFocused ? icons(footerIcon.active[route.name], { active: true }) : icons(footerIcon.basic[route.name])}
              {/* <Text style={{ color: isFocused ? 'tomato' : 'black', paddingTop: 5}}>{label}</Text> */}
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
