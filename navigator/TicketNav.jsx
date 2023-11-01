import React, { createContext, useCallback, useRef, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TicketList from "../screens/ticket/TicketList";
import Send from "../screens/ticket/Send";
import Layout from "../components/Layout";
import ReceiveList from "../screens/ticket/ReceiveList";
import SendList from "../screens/ticket/SendList";
import { Animated, View } from "react-native";
import { Appbar } from "react-native-paper";
import { TicketContext } from "../context";
import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

export default function TicketNav({ navigation }) {
  const [myTicket, setMyTicket] = useState();
  const [receiveList, setReceiveList] = useState();
  const [sendList, setSendList] = useState();
  const queryClient = useQueryClient();
  const values = {
    myTicket,
    setMyTicket,
    receiveList,
    setReceiveList,
    sendList,
    setSendList,
  };

  useFocusEffect(
    useCallback(() => {
      navigation.navigate("TicketList");
      queryClient.invalidateQueries(["myticket"]);
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["receive"]);

      Animated.timing(topBottom, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).start();
      return () => {
        Animated.timing(topBottom, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
        }).reset();
      };
    }, [])
  );
  const topBottom = useRef(new Animated.Value(-5)).current;

  return (
    <TicketContext.Provider value={values}>
      <View style={{ backgroundColor: "#ecf2f0" }}>
        <Animated.View style={{ transform: [{ translateY: topBottom }] }}>
          <Appbar.Header style={{ backgroundColor: "#ecf2f0" }}>
            <Appbar.BackAction
              color="black"
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Appbar.Content title="Ticket" color="black" />
          </Appbar.Header>
        </Animated.View>
      </View>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "#ecf2f0" }}
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: "#ff3183" },
          tabBarActiveTintColor: "#ff3183",
          tabBarInactiveTintColor: "#000",
          tabBarLabelStyle: { fontSize: 15 },
          tabBarStyle: { backgroundColor: "#ecf2f0" },
        }}
        initialRouteName="TicketList"
      >
        <Tab.Screen name="TicketList" component={TicketList} options={{ tabBarLabel: "내 참가권" }} />
        <Tab.Screen name="Send" component={Send} options={{ tabBarLabel: "전송하기" }} />
        <Tab.Screen name="ReceiveList" component={ReceiveList} options={{ tabBarLabel: "수령내역" }} />
        <Tab.Screen name="SendList" component={SendList} options={{ tabBarLabel: "전송내역" }} />
      </Tab.Navigator>
    </TicketContext.Provider>
  );
}
