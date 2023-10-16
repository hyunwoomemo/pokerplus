import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import TicketList from "../screens/ticket/TicketList";
import { useColorScheme } from "react-native";
import CustomTicketTabBar from "../components/CustomTicketTabBar";

const TicketTab = createBottomTabNavigator();

const TicketTabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <TicketTab.Navigator
      sceneContainerStyle={{}}
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "pink",
        tabBarShowLabel: false,
      }}
      tabBar={(props) => {
        console.log(props);

        return <CustomTabBar {...props} />;
      }}
    >
      <TicketTab.Screen name="tickets" component={TicketList} />
    </TicketTab.Navigator>
  );
};

export default TicketTabs;
