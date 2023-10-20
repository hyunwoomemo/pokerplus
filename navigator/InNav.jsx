import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyDrawer } from "./Drawer";
import { InNavContext } from "../context";

const Nav = createNativeStackNavigator();

const InNav = () => {
  const [myTicketCount, setMyTicketCount] = useState(0);
  const values = {
    myTicketCount,
    setMyTicketCount,
  };
  return (
    <InNavContext.Provider value={values}>
      <Nav.Navigator
        screenOptions={{
          headerTintColor: "white",
        }}
      >
        <Nav.Screen name="Drawer" component={MyDrawer} options={{ headerShown: false }} />
      </Nav.Navigator>
    </InNavContext.Provider>
  );
};

export default InNav;
