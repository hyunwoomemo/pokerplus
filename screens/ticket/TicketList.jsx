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
import { useQuery } from "@tanstack/react-query";

const TicketList = () => {
  const [tickets, setTickets] = useState();

  const { data, isLoading, isError } = useQuery(["myticket"], ticketApi.list);

  useEffect(() => {
    setTickets(data?.DATA.filter((v) => v.ticket_count !== 0));
  }, [data]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : tickets?.length > 0 ? (
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
