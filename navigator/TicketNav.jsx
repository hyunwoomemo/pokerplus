import React, { createContext, useCallback, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TicketList from "../screens/ticket/TicketList";
import Send from "../screens/ticket/Send";
import Layout from "../components/Layout";
import ReceiveList from "../screens/ticket/ReceiveList";
import SendList from "../screens/ticket/SendList";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
      return () => {};
    }, [])
  );

  return (
    <TicketContext.Provider value={values}>
      <Appbar.Header style={{ backgroundColor: "#ecf2f0" }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Ticket" />
        {/* <Appbar.Action icon="calendar" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} /> */}
      </Appbar.Header>
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
