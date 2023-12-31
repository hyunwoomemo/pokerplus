import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Policy from "../screens/policy/Policy";
import PolicyDetail from "../screens/policy/PolicyDetail";

const Stack = createNativeStackNavigator();

const PolicyNav = () => {
  return (
    <Stack.Navigator initialRouteName="Policy" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Policy" component={Policy} />
      <Stack.Screen name="PolicyDetail" component={PolicyDetail} options={{ presentation: "modal" }} />
    </Stack.Navigator>
  );
};

export default PolicyNav;
