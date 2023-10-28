import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useCallback, useState } from "react";
import Notice from "../screens/Notice";
import NoticeDetail from "../screens/NoticeDetail";
import { useFocusEffect } from "@react-navigation/native";
import { NoticeContext } from "../context";

const Stack = createNativeStackNavigator();

const NoticeNav = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const value = { currentPage, setCurrentPage };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setCurrentPage(1);
      };
    }, [])
  );

  return (
    <NoticeContext.Provider value={value}>
      <Stack.Navigator initialRouteName="Notice" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Notice" component={Notice} />
        <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
      </Stack.Navigator>
    </NoticeContext.Provider>
  );
};

export default NoticeNav;
