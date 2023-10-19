import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { Octicons } from '@expo/vector-icons';

const TicketTab = ({ state, descriptors, navigation, options }) => {
  // const icons = {
  //   home: <Octicons name="home" size={24} color="black" />,
  //   ticket: <MaterialCommunityIcons name="ticket-confirmation-outline" size={24} color="black" />
  // }
  return (
    <View
      className="tabs"
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 10,
      }}
    >
      {state.routes.map((route, index) => {
        if (index < 5) {
          // Display only the first 4 items
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

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
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* {icons[route.name]} */}
              <Text
                // className={isFocused ? "on" : ""}
                style={{ color: isFocused ? "tomato" : "black", paddingTop: 5 }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        } else {
          return null; // Hide the other items
        }
      })}
    </View>
  );
};

export default TicketTab;
