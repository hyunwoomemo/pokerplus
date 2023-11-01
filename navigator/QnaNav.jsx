import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QnaList from "../screens/qna/QnaList";
import QnaDetail from "../screens/qna/QnaDetail";
import { useFocusEffect } from "@react-navigation/native";
import { QnaContext } from "../context";
import { useCallback, useState } from "react";

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
