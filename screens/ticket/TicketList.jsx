import React, { useCallback, useEffect, useState } from "react";
import { Alert, RefreshControl, Text, View } from "react-native";
import Layout from "../../components/Layout";
import { AntDesign } from "@expo/vector-icons";
import { ticketApi } from "../../api";
import { FlatList } from "react-native";
import TicketItem from "../../components/TicketItem";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NoItem from "../../components/NoItem";
import Error from "../../components/Error";

const TicketList = ({ navigation }) => {
  const [tickets, setTickets] = useState();
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError } = useQuery(["myticket"], ticketApi.list);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    queryClient.invalidateQueries(["myticket"]);
  }, []);

  useEffect(() => {
    setTickets(data?.DATA?.filter((v) => v.ticket_count !== 0));
  }, [data]);

  if (isError) {
    return <Error />;
  }

  if (tickets?.length === 0) {
    return <NoItem text={"보유하신 참가권이 없습니다."} />;
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : (
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={tickets}
          keyExtractor={(item, index) => `${index}-${item.ticket_info_id}`}
          renderItem={({ item, index }) => <TicketItem item={item} index={index} />}
        />
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
