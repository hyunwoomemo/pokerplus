import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QrCreate from "../screens/qr/QrCreate";
import QrScan from "../screens/qr/QrScan";
import QrSend from "../screens/qr/QrSend";

const Stack = createNativeStackNavigator();

const QrNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QrCreate" component={QrCreate} />
      <Stack.Screen name="QrScan" component={QrScan} />
      <Stack.Screen name="QrSend" component={QrSend} />
    </Stack.Navigator>
  );
};

export default QrNav;
