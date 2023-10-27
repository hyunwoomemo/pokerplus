import React, { useCallback, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
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
import NoItem from "../../components/NoItem";

const TicketList = ({ navigation }) => {
  const [tickets, setTickets] = useState();

  const { data, isLoading, isError } = useQuery(["myticket"], ticketApi.list);

  useEffect(() => {
    setTickets(data?.DATA?.filter((v) => v.ticket_count !== 0));
  }, [data]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : tickets?.length > 0 ? (
        <FlatList data={tickets} keyExtractor={(item, index) => `${index}-${item.ticket_info_id}`} renderItem={({ item }) => <TicketItem item={item} />} />
      ) : (
        <NoItem text={"보유하신 참가권이 없습니다."} />
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
