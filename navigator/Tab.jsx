import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Ticket from "../screens/Ticket";
import { useColorScheme } from "react-native";
import Profile from "../screens/Profile";
import Notice from "../screens/Notice";
import CustomTabBar from "../components/CustomTabBar";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="home-outline" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen name="Ticket" component={Ticket} />
      <Tab.Screen name="Championship" component={Menu2} />
      <Tab.Screen name="Pub" component={Menu3} />
      <Tab.Screen name="Notice" component={Notice} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
