import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Menu2 from "../screens/Menu2";
import Menu3 from "../screens/Menu3";
import Menu4 from "../screens/Menu4";
import Home from "../screens/Home";
import Ticket from "../screens/Ticket";
import { useColorScheme } from "react-native";
import Profile from '../screens/Profile';
import { MyDrawer } from './Drawer';
import Notice from '../screens/Notice';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator sceneContainerStyle={{
      
    }}
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: 'pink',
        tabBarShowLabel: false,
      }} tabBar={(props) => {
        console.log(props)
          
          return <CustomTabBar {...props} />
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
      <Tab.Screen name="ticket" component={Ticket} />
      <Tab.Screen name="2" component={Menu2} />
      <Tab.Screen name="3" component={Menu3} />
      <Tab.Screen name="4" component={Menu4} />
      <Tab.Screen name='Profile' component={Profile} options={{presentation: 'modal' }}/>
      <Tab.Screen name='Notice' component={Notice} options={{presentation: 'modal' }}/>
    </Tab.Navigator>
  );
};

export default Tabs;
