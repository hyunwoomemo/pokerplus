import React, { createContext, useState } from "react";
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

const Tab = createMaterialTopTabNavigator();

export default function TicketNav({ navigation }) {
  const [myTicket, setMyTicket] = useState();
  const [receiveList, setReceiveList] = useState();
  const [sendList, setSendList] = useState();
  const values = {
    myTicket,
    setMyTicket,
    receiveList,
    setReceiveList,
    sendList,
    setSendList,
  };

  return (
    <TicketContext.Provider value={values}>
      {/* <Layout> */}
      {/* <SafeAreaView></SafeAreaView> */}
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
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
        sceneContainerStyle={{ backgroundColor: "#fff" }}
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: "#ff3183" },
          tabBarActiveTintColor: "#ff3183",
          tabBarInactiveTintColor: "#000",
          tabBarLabelStyle: { fontSize: 15 },
        }}
      >
        <Tab.Screen name="TicketList" component={TicketList} options={{ tabBarLabel: "내 참가권" }} />
        <Tab.Screen name="Send" component={Send} options={{ tabBarLabel: "전송하기" }} />
        <Tab.Screen name="ReceiveList" component={ReceiveList} options={{ tabBarLabel: "수령내역" }} />
        <Tab.Screen name="SendList" component={SendList} options={{ tabBarLabel: "전송내역" }} />
      </Tab.Navigator>
      {/* </Layout> */}
    </TicketContext.Provider>
  );
}
