import React, { useCallback, useContext, useEffect, useState } from "react";
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

const Notice = ({ navigation }) => {
  const [notice, setNotice] = useState();
  const [offset, setOffset] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const { currentPage, setCurrentPage } = useContext(NoticeContext);
  const [loading, setLoading] = useState(true);
  const numberOfItemsPerPageList = [2, 3, 4];
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (!notice) {
  //     customerApi
  //       .noticeList({
  //         board_id: "notice",
  //         offset,
  //         page: currentPage,
  //       })
  //       .then((res) => {
  //         LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

  //         setTotal(res.DATA.total);
  //         setNotice(res.DATA.data);
  //       })
  //       .then(() => setLoading(false));
  //   }
  // }, []);

  const { data, isLoading, isError } = useQuery(["notice", currentPage], () => customerApi.noticeList({ board_id: "notice", offset, page: currentPage }), {
    staleTime: 2000,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["notice", nextPage], () => customerApi.noticeList({ board_id: "notice", offset, page: nextPage }));
    }
  }, [currentPage, queryClient]);

  // console.log(data);

  // useEffect(() => {
  //   setLoading(true);
  //   customerApi
  //     .noticeList({
  //       board_id: "notice",
  //       offset,
  //       page: currentPage,
  //     })
  //     .then((res) => {
  //       LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

  //       setTotal(res.DATA.total);
  //       setNotice(res.DATA.data);
  //     })
  //     .then(() => setLoading(false));
  // }, [currentPage]);

  useEffect(() => {
    setTotalPage(Math.ceil(data?.DATA.total / offset));
  }, []);

  const { height } = Dimensions.get("window");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="Notice" />
      {/* <Text style={{ textAlign: "center", fontSize: 20, paddingVertical: 20 }}>공지사항</Text> */}
      {isLoading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : (
        <FlatList
          data={data.DATA.data}
          keyExtractor={(item, index) => index}
          // horizontal
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ padding: 20, gap: 5, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.1)" }}
              onPress={() =>
                navigation.navigate("NoticeDetail", {
                  notice: data.DATA.data,
                  index: index,
                })
              }
            >
              <Text style={{ fontSize: 18 }}>{item.subject}</Text>
              <Text style={{ color: "gray" }}>{moment(item.created_at).utc().format("YY/MM/DD")}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {!isLoading && data.DATA.total > offset && (
        <DataTable>
          <DataTable.Pagination
            page={currentPage}
            numberofPages={Math.ceil(data.DATA.total / offset)}
            onPageChange={(page) => {
              if (page > 0 && page <= Math.ceil(data.DATA.total / 10)) {
                setCurrentPage(page);
              }
            }}
            label={`${(currentPage - 1) * offset + 1}-${Math.min(currentPage * offset, data.DATA.total)} of ${data.DATA.total}`}
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
        // <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 20 }}>
        //   <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        // </View>
      )}
    </View>
  );
};

export default Notice;
