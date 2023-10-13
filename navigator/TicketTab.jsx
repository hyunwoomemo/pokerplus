import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Menu2 from "../screens/Menu2";
import Menu3 from "../screens/Menu3";
import Menu4 from "../screens/Menu4";
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
      <TicketTab.Screen name="2" component={Menu2} />
      <TicketTab.Screen name="3" component={Menu3} />
      <TicketTab.Screen name="4" component={Menu4} />
    </TicketTab.Navigator>
  );
};

export default TicketTabs;
