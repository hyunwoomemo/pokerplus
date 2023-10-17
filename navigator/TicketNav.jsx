import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TicketList from "../screens/ticket/TicketList";
import Send from "../screens/ticket/Send";
import Layout from "../components/Layout";
import ReceiveList from "../screens/ticket/ReceiveList";
import SendList from "../screens/ticket/SendList";

const Tab = createMaterialTopTabNavigator();

export default function TicketNav() {
  return (
    <Layout>
      <Tab.Navigator style={{ marginTop: 30 }}>
        <Tab.Screen name="TicketList" component={TicketList} />
        <Tab.Screen name="Send" component={Send} />
        <Tab.Screen name="ReceiveList" component={ReceiveList} />
        <Tab.Screen name="SendList" component={SendList} />
      </Tab.Navigator>
    </Layout>
  );
}
