import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import QnaList from "../screens/QnaList";
import QnaDetail from "../screens/QnaDetail";

const QnaNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="QnaList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QnaList" component={QnaList} />
      <Stack.Screen name="QnaDetail" component={QnaDetail} />
    </Stack.Navigator>
  );
};

export default QnaNav;
