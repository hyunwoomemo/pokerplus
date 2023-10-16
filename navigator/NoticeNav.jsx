import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Notice from "../screens/Notice";
import NoticeDetail from "../screens/NoticeDetail";

const Stack = createNativeStackNavigator();

const NoticeNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notice"
      screenListeners={() => ({
        blur: () => {
          console.log("blur");
        },
      })}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Notice" component={Notice} />
      <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
    </Stack.Navigator>
  );
};

export default NoticeNav;
