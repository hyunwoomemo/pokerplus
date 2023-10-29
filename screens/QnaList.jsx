import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, LayoutAnimation, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Layout from "../components/Layout";
import { customerApi } from "../api";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import Pagination from "../components/Pagination";
import { QnaContext } from "../context";
import AppBar from "../components/AppBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { offsetValue } from "../config";
import NoItem from "../components/NoItem";
import { useFocusEffect } from "@react-navigation/native";
import ScreenLayout from "../components/ScreenLayout";

const QnaList = ({ route, navigation }) => {
  const { currentPage, setCurrentPage } = useContext(QnaContext);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    queryClient.invalidateQueries(["myticket"]);
  }, []);

  const flatRef = useRef();

  const queryClient = useQueryClient();

  const itemStatus = (code) => {
    return status?.filter((item) => item.code === code)[0]?.title;
  };

  const { data, isLoading, isError } = useQuery(["qna", currentPage], () => customerApi.customerList(0, offsetValue, currentPage), {
    staleTime: 2000,
    keepPreviousData: true,
  });

  useEffect(() => {
    flatRef?.current?.scrollToOffset({ offset: 0, animated: true });
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["qna", nextPage], () => customerApi.customerList(0, offsetValue, nextPage));
    }
  }, [currentPage, queryClient]);

  useEffect(() => {
    if (currentPage === 1) {
      queryClient.prefetchQuery(["qna", 2], () => customerApi.customerList(0, offsetValue, 2));
    }
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setTotalPage(Math.ceil(data?.DATA.total / offsetValue));
    setStatus(data?.DATA.stat);
  }, [data?.DATA]);

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(["qna"]);
    }, [])
  );

  return (
    <ScreenLayout title={"1:1 문의 내역"}>
      {isLoading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : (
        <>
          {data?.DATA.data.length ? (
            <>
              <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                style={styles.main}
                data={data?.DATA.data}
                ref={flatRef}
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
                      <Text style={{ fontSize: 18 }}>{item.contents}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </>
          ) : (
            <NoItem text="문의 내역이 없습니다." />
          )}
          {totalPage > 1 && (
            <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 10 }}>
              <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </View>
          )}
        </>
      )}
    </ScreenLayout>
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
  main: {},
  innerContainer: {
    borderRadius: 15, // <-- Inner Border Radius
    flex: 1,
    margin: 2, // <-- Border Width
    backgroundColor: "#ecf2f0",
    justifyContent: "center",
  },
  itemWrapper: {
    paddingHorizontal: 20,
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
    fontSize: 16,
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
    fontSize: 16,
  },
});
export default QnaList;
