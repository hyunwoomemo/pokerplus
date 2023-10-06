import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyDrawer } from "./Drawer";
import Terms from "../screens/auth/Terms";
import InNav from "./InNav";
import JoinView from "../screens/join/JoinView";
import JoinTest from "../screens/join/JoinTest";
import Join from "../screens/Join";
import Login from "../screens/auth/Login";

const Nav = createNativeStackNavigator();

const OutNav = ({ route }) => {
  console.log(route.params?.type);
  return (
    <Nav.Navigator
      screenOptions={{
        // presentation: "modal",
        // headerTintColor: "white",
        headerShown: false,
      }}
    >
      <Nav.Screen name="Login" component={Login} />
      <Nav.Screen name="Join" component={JoinView} />
      <Nav.Screen name="Terms" component={Terms} />
    </Nav.Navigator>
  );
};

export default OutNav;
