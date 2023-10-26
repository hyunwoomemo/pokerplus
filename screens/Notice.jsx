import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Layout from "../components/Layout";
import { customerApi } from "../api";
import moment from "moment";
import Pagination from "../components/Pagination";
import { NoticeContext } from "../context";
import Header from "../components/Header";
import { Appbar, DataTable } from "react-native-paper";
import AppBar from "../components/AppBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { offsetValue } from "../config";

const Notice = ({ navigation }) => {
  const [notice, setNotice] = useState();
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const { currentPage, setCurrentPage } = useContext(NoticeContext);
  const [loading, setLoading] = useState(true);
  const numberOfItemsPerPageList = [2, 3, 4];
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);

  const flatRef = useRef();

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(["notice", currentPage], () => customerApi.noticeList({ board_id: "notice", offset: offsetValue, page: currentPage }), {
    staleTime: 2000,
    keepPreviousData: true,
  });

  useEffect(() => {
    flatRef?.current?.scrollToOffset({ offset: 0, animated: true });
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["notice", nextPage], () => customerApi.noticeList({ board_id: "notice", offset: offsetValue, page: nextPage }));
    }
  }, [currentPage, queryClient]);

  useEffect(() => {
    if (currentPage === 1) {
      queryClient.prefetchQuery(["notice", 2], () => customerApi.noticeList({ board_id: "notice", offset: offsetValue, page: 2 }));
    }
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(data?.DATA.total / offsetValue));
  }, [data?.DATA.total]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ecf2f0" }}>
      <AppBar title="Notice" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.DATA.data}
        ref={flatRef}
        keyExtractor={(item, index) => index}
        // horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ padding: 20, gap: 5, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.1)" }}
            onPress={() =>
              navigation.navigate("NoticeDetail", {
                notice: data?.DATA.data,
                index: index,
              })
            }
          >
            <Text style={{ fontSize: 18 }}>{item.subject}</Text>
            <Text style={{ color: "gray" }}>{moment(item.created_at).utc().format("YY/MM/DD")}</Text>
          </TouchableOpacity>
        )}
      />
      {/* )} */}

      {!isLoading && data?.DATA.total > offsetValue && (
        <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 20 }}>
          <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </View>
      )}
    </View>
  );
};

export default Notice;
