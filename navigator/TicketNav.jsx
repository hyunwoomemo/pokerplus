import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TicketList from "../screens/ticket/TicketList";
import Send from "../screens/ticket/Send";
import Layout from "../components/Layout";
import ReceiveList from "../screens/ticket/ReceiveList";
import SendList from "../screens/ticket/SendList";
import { Text } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function TicketNav() {
  return (
    <Layout>
      <Tab.Navigator
        style={{ marginTop: 20 }}
        sceneContainerStyle={{ backgroundColor: "#ebf2f0" }}
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: "#ff3183" },
          tabBarActiveTintColor: "#ff3183",
          tabBarInactiveTintColor: "#000",
        }}
      >
        <Tab.Screen name="TicketList" component={TicketList} options={{ tabBarLabel: "내 참가권" }} />
        <Tab.Screen name="Send" component={Send} options={{ tabBarLabel: "전송하기" }} />
        <Tab.Screen name="ReceiveList" component={ReceiveList} options={{ tabBarLabel: "수령내역" }} />
        <Tab.Screen name="SendList" component={SendList} options={{ tabBarLabel: "전송내역" }} />
      </Tab.Navigator>
    </Layout>
  );
}
