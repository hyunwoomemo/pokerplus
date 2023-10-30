import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QnaList from "../screens/qna/QnaList";
import QnaDetail from "../screens/qna/QnaDetail";
import { useFocusEffect } from "@react-navigation/native";
import { QnaContext } from "../context";
import { useCallback, useState } from "react";

const QnaNav = () => {
  const Stack = createNativeStackNavigator();
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
    <QnaContext.Provider value={value}>
      <Stack.Navigator initialRouteName="QnaList" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="QnaList" component={QnaList} />
        <Stack.Screen name="QnaDetail" component={QnaDetail} />
      </Stack.Navigator>
    </QnaContext.Provider>
  );
};

export default QnaNav;
