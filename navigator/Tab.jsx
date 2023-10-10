import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Menu2 from "../screens/Menu2";
import Menu3 from "../screens/Menu3";
import Menu4 from "../screens/Menu4";
import Home from "../screens/Home";
import Ticket from "../screens/Ticket";
import TicketTab from "../navigator/TicketTab";
import { useColorScheme } from "react-native";
import Profile from "../screens/Profile";
import { MyDrawer } from "./Drawer";
import Notice from "../screens/Notice";
// import Test from "../screens/Test";
import QrCreate from "../screens/qr/QrCreate";
import QrScan from "../screens/qr/QrScan";
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
      <Tab.Screen name="Ticket" component={TicketTab} />
      <Tab.Screen name="Championship" component={Menu2} />
      <Tab.Screen name="Pub" component={Menu3} />
      <Tab.Screen name="Notice" component={Notice} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="QrCreate" component={QrCreate} />
      <Tab.Screen name="QrScan" component={QrScan} />
    </Tab.Navigator>
  );
};

export default Tabs;
