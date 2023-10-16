import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyDrawer } from "./Drawer";

const Nav = createNativeStackNavigator();

const InNav = () => (
  <Nav.Navigator
    screenOptions={{
      headerTintColor: "white",
    }}
  >
    <Nav.Screen name="Drawer" component={MyDrawer} options={{ headerShown: false }} />
  </Nav.Navigator>
);

export default InNav;
