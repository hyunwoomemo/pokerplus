import React, { useCallback, useContext, useEffect, useState } from "react";
import { LayoutAnimation, Text, View, ActivityIndicator } from "react-native";
import Layout from "../../components/Layout";
import { ticketApi } from "../../api";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import ReceiveItem from "../../components/ReceiveItem";
import SendItem from "../../components/SendItem";
import { useFocusEffect } from "@react-navigation/native";
import { TicketContext } from "../../context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Pagination from "../../components/Pagination";

const SendList = () => {
  const { sendList, setSendList } = useContext(TicketContext);
  const [offset, setOffset] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["send", currentPage], () => ticketApi.sendList("send", offset, currentPage));

  useEffect(() => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["send", nextPage], () => ticketApi.sendList("send", offset, nextPage));
    }
  }, [currentPage, queryClient]);

  useEffect(() => {
    setTotalPage(Math.ceil(data?.TOTAL / 10));
  }, [data?.TOTAL]);

  console.log(data);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : (
        <>
          <View style={styles.container}>
            <FlatList data={data?.DATA} keyExtractor={(item, index) => `${index}-${item.ticket_info_id}`} renderItem={({ item }) => <ReceiveItem item={item} />} />
          </View>
          <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 10 }}>
            {totalPage > 1 && <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
          </View>
        </>
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

export default SendList;
