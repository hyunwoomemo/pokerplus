import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import TicketList from "../screens/ticket/TicketList";
import { useColorScheme } from "react-native";

const TicketTab = createBottomTabNavigator();

const TicketTabs = () => {
  return (
    <TicketTab.Navigator
      sceneContainerStyle={{}}
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "pink",
        tabBarShowLabel: false,
      }}
      tabBar={(props) => {
        return <CustomTabBar {...props} />;
      }}
    >
      <TicketTab.Screen name="tickets" component={TicketList} />
    </TicketTab.Navigator>
  );
};

export default TicketTabs;
