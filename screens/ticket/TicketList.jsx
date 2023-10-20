import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Layout from "../../components/Layout";
import { AntDesign } from "@expo/vector-icons";
import { ticketApi } from "../../api";
import { FlatList } from "react-native";
import TicketItem from "../../components/TicketItem";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const TicketList = () => {
  const [tickets, setTickets] = useState();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);
  //   const getTicket = async () => {
  //     try {
  //       const res = await ticketApi.list();
  //       setTickets(res.DATA);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getTicket();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const getTicket = async () => {
        try {
          const res = await ticketApi.list();
          const filterData = res.DATA.filter((v) => v.ticket_count !== 0);
          setTickets(filterData);
          console.log(filterData);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      getTicket();
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : tickets.length > 0 ? (
        <FlatList data={tickets} keyExtractor={(item, index) => `${index}-${item.ticket_info_id}`} renderItem={({ item }) => <TicketItem item={item} />} />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center", gap: 40, marginTop: 100 }}>
          <AntDesign name="warning" size={36} color="tomato" />
          <Text style={{ fontSize: 20, color: "gray" }}>참가권이 존재하지 않습니다.</Text>
        </View>
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
