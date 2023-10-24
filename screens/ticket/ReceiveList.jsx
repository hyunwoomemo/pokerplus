import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Layout from "../../components/Layout";
import { ticketApi } from "../../api";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import ReceiveItem from "../../components/ReceiveItem";
import { TicketContext } from "../../context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Pagination from "../../components/Pagination";

const ReceiveList = () => {
  const [offset, setOffset] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const flatRef = useRef();

  const queryClient = useQueryClient();

  useEffect(() => {
    flatRef.current.scrollToOffset({ offset: 0, animated: true });
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["receive", nextPage], () => ticketApi.receiveList("receive", offset, nextPage));
    }
  }, [currentPage, queryClient]);

  const { data, isLoading, isError } = useQuery(["receive", currentPage], () => ticketApi.receiveList("receive", offset, currentPage), {
    staleTime: 2000,
    keepPreviousData: true,
  });

  useEffect(() => {
    setTotalPage(Math.ceil(data?.TOTAL / 10));
  }, [data?.TOTAL]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : (
        <>
          <View style={styles.container}>
            <FlatList ref={flatRef} data={data?.DATA} keyExtractor={(item, index) => `${index}-${item.ticket_info_id}`} renderItem={({ item }) => <ReceiveItem item={item} />} />
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

export default ReceiveList;
