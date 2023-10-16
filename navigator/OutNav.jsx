import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Terms from "../screens/auth/Terms";
import Join from "../screens/join/Join";
import Login from "../screens/auth/Login";
import FindId from "../screens/auth/FindId";
import FindIdSuccess from "../screens/auth/FindIdSuccess";
import FindPwSuccess from "../screens/auth/FindPwSuccess";
import FindPw from "../screens/auth/FindPw";

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
      <Nav.Screen name="Join" component={Join} />
      <Nav.Screen name="Terms" component={Terms} />
      <Nav.Screen name="FindId" component={FindId} />
      <Nav.Screen name="FindPw" component={FindPw} />
      <Nav.Screen name="FindIdSuccess" component={FindIdSuccess} />
      <Nav.Screen name="FindPwSuccess" component={FindPwSuccess} />
    </Nav.Navigator>
  );
};

export default OutNav;
