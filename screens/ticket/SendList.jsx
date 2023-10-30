import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { offsetValue } from "../../config";
import NoItem from "../../components/NoItem";
import Error from "../../components/Error";

const SendList = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const flatRef = useRef();

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(["send", currentPage], () => ticketApi.sendList("send", offsetValue, currentPage), { keepPreviousData: true });

  console.log(data);

  useEffect(() => {
    flatRef?.current?.scrollToOffset({ offset: 0, animated: true });
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["send", nextPage], () => ticketApi.sendList("send", offsetValue, nextPage));
    }
  }, [currentPage, queryClient]);

  useEffect(() => {
    setTotalPage(Math.ceil(data?.TOTAL / 10));
  }, [data?.TOTAL]);

  useEffect(() => {
    if (currentPage === 1) {
      queryClient.prefetchQuery(["send", 2], () => ticketApi.sendList("send", offsetValue, 2));
    }
  }, []);

  useEffect(() => {
    if (currentPage === 1) {
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      });
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        // navigation.goBack();
        setCurrentPage(1);
      };
    }, [])
  );

  if (isError) {
    return <Error />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ecf2f0" }}>
      {isLoading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : (
        <>
          {data?.DATA?.length ? (
            <>
              <View style={{ flex: 1 }}>
                <FlatList ref={flatRef} data={data?.DATA} keyExtractor={(item, index) => `${index}-${item.ticket_info_id}`} renderItem={({ item }) => <SendItem item={item} />} />
              </View>
              <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 10 }}>
                {totalPage > 1 && <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
              </View>
            </>
          ) : (
            <NoItem text="전송 내역이 존재하지 않습니다." />
          )}
        </>
      )}
    </View>
  );
};

export default SendList;
