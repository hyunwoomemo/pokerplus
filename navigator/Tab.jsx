import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Menu2 from "../screens/Menu2";
import Menu3 from "../screens/Menu3";
import Menu4 from "../screens/Menu4";
import Home from "../screens/Home";
import Ticket from "../screens/Ticket";
import { useColorScheme } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Profile from '../screens/auth/Profile';

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
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="home-outline" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="ticket"
        component={Ticket}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="ticket-confirmation-outline" size={24} color="black" />,
        }}
      />
      <Tab.Screen name="2" component={Menu2} options={{ tabBarIcon: () => <Ionicons name="ios-trophy-outline" size={24} color="black" /> }} />
      <Tab.Screen name="3" component={Menu3} options={{ tabBarIcon: () => <MaterialIcons name="storefront" size={24} color="black" /> }} />
      <Tab.Screen name="4" component={Menu4} options={{ tabBarIcon: () => <AntDesign name="notification" size={24} color="black" /> }} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
