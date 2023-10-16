import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import Tabs from "./Tab";
import { MyDrawer } from "./Drawer";
import Profile from "../screens/Profile";
import InNav from "./InNav";
import OutNav from "./OutNav";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/auth/atom";

const Nav = createNativeStackNavigator();

const Root = ({ route }) => {
  const [auth] = useRecoilState(authState);

  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {Object.keys(auth).length > 0 ? <Nav.Screen name="InNav" component={InNav} /> : <Nav.Screen name="OutNav" component={OutNav} />}
      {/* <Nav.Screen name="InNav" component={InNav} /> */}
    </Nav.Navigator>
  );
};

export default Root;
