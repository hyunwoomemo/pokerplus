import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Layout from "../../components/Layout";
import { AntDesign } from "@expo/vector-icons";
import { ticketApi } from "../../api";
import { FlatList } from "react-native";
import TicketItem from "../../components/TicketItem";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";

const TicketList = () => {
  const [tickets, setTickets] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    const getTicket = async () => {
      try {
        const res = await ticketApi.list();
        setTickets(res.DATA);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTicket();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : tickets ? (
        <FlatList data={tickets} keyExtractor={(item) => item.ticket_info_id} renderItem={({ item }) => <TicketItem item={item} />} />
      ) : (
        <AntDesign name="warning" size={24} color="black" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
});

export default TicketList;
