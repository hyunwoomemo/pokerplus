import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Layout from "../components/Layout";
import { customerApi } from "../api";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import Pagination from "../components/Pagination";
import { QnaContext } from "../context";
import AppBar from "../components/AppBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const QnaList = ({ route, navigation }) => {
  const [offset, setOffset] = useState(10);
  const { currentPage, setCurrentPage } = useContext(QnaContext);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState([]);

  const queryClient = useQueryClient();

  const itemStatus = (code) => {
    return status?.filter((item) => item.code === code)[0]?.title;
  };

  const { data, isLoading, isError } = useQuery(["qna", currentPage], () => customerApi.customerList(0, offset, currentPage), {
    staleTime: 2000,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["qna", nextPage], () => customerApi.customerList(0, offset, nextPage));
    }
  }, [currentPage, queryClient]);

  useEffect(() => {
    setTotalPage(Math.ceil(data?.DATA.total / offset));
    setStatus(data?.DATA.stat);
  }, [data?.DATA]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="1:1 문의 내역" />
      {isLoading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : (
        <>
          <FlatList
            style={styles.main}
            data={data.DATA.data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <TouchableOpacity key={item.id} style={styles.itemWrapper} onPress={() => navigation.navigate("QnaDetail", { qna: item })}>
                <LinearGradient colors={["#4c56fa", "#bb21a8"]} start={{ x: 1, y: 0 }} style={styles.gradient} end={{ x: 0, y: 0 }}>
                  <View style={styles.innerContainer}>
                    <Text style={styles.status}>{itemStatus(item.status_code)}</Text>
                  </View>
                </LinearGradient>
                <View style={styles.contentsWrapper}>
                  <View style={styles.itemheader}>
                    <Text style={styles.itemheaderText}>{item.company_name}</Text>
                    <Text style={styles.itemheaderText}>{moment(item.created_at).utc().add(9, "h").format("YY/MM/DD HH:mm:ss")}</Text>
                  </View>
                  <Text>{item.contents}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 10 }}>
            {totalPage > 1 && <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0,0,0.2)",
  },
  main: {
    paddingHorizontal: 32,
  },
  innerContainer: {
    borderRadius: 15, // <-- Inner Border Radius
    flex: 1,
    margin: 2, // <-- Border Width
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0,0,0.1)",
  },
  contentsWrapper: {
    flex: 1,
    gap: 10,
  },
  itemheader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemheaderText: {
    color: "gray",
  },
  gradient: {
    height: 50,
    width: 50,
    borderRadius: 18, // <-- Outer Border Radius
  },
  status: {
    textAlign: "center",
    margin: 5,
    color: "#cc2b5e",
    backgroundColor: "transparent",
  },
});
export default QnaList;
