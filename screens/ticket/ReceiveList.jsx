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
import { offsetValue } from "../../config";
import NoItem from "../../components/NoItem";

const ReceiveList = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const flatRef = useRef();

  const queryClient = useQueryClient();

  useEffect(() => {
    flatRef?.current?.scrollToOffset({ offset: 0, animated: true });
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["receive", nextPage], () => ticketApi.receiveList("receive", offsetValue, nextPage));
    }
  }, [currentPage, queryClient]);

  useEffect(() => {
    if (currentPage === 1) {
      queryClient.prefetchQuery(["receive", 2], () => ticketApi.receiveList("receive", offsetValue, 2));
    }
  }, []);

  const { data, isLoading, isError } = useQuery(["receive", currentPage], () => ticketApi.receiveList("receive", offsetValue, currentPage), {
    staleTime: 2000,
    keepPreviousData: true,
  });

  useEffect(() => {
    setTotalPage(Math.ceil(data?.TOTAL / offsetValue));
  }, [data?.TOTAL]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ecf2f0" }}>
      {isLoading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : (
        <>
          {data?.DATA.length ? (
            <>
              <View style={styles.container}>
                <FlatList ref={flatRef} data={data?.DATA} keyExtractor={(item, index) => `${index}-${item.ticket_info_id}`} renderItem={({ item }) => <ReceiveItem item={item} />} />
              </View>
              <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 10 }}>
                {totalPage > 1 && <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
              </View>
            </>
          ) : (
            <NoItem text={"수령 내역이 존재하지 않습니다."} />
          )}
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
