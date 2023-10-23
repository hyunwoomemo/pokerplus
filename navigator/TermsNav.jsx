import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Terms from "../screens/auth/Terms";
import TermsDetail from "../screens/auth/TermsDetail";

const Stack = createNativeStackNavigator();

const TermsNav = () => {
  return (
    <Stack.Navigator initialRouteName="Terms" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="TermsDetail" component={TermsDetail} options={{ presentation: "modal" }} />
    </Stack.Navigator>
  );
};

export default TermsNav;
