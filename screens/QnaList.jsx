import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Layout from "../components/Layout";
import { customerApi } from "../api";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import Pagination from "../components/Pagination";
import { QnaContext } from "../context";

const QnaList = ({ route, navigation }) => {
  const [qna, setQna] = useState([]);
  const [offset, setOffset] = useState(10);
  const { currentPage, setCurrentPage } = useContext(QnaContext);
  const [total, setTotal] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemStatus = (code) => {
    return status.filter((item) => item.code === code)[0]?.title;
  };

  useEffect(() => {
    setCurrentPage(1);
    customerApi
      .customerList(0, offset, currentPage)
      .then((res) => {
        if (res.CODE === "DCL000") {
          setQna(res.DATA.data);
          setStatus(res.DATA.stat);
          setTotal(res.DATA.total);
        }
      })
      .then(() => setLoading(false));
  }, [route.params?.data]);

  useEffect(() => {
    setLoading(true);
    customerApi
      .customerList(0, offset, currentPage)
      .then((res) => {
        if (res.CODE === "DCL000") {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

          setQna(res.DATA.data);
          setStatus(res.DATA.stat);
          setTotal(res.DATA.total);
        }
      })
      .then(() => setLoading(false));
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    if (qna.length === 0) {
      customerApi
        .customerList(0, offset, currentPage)
        .then((res) => {
          if (res.CODE === "DCL000") {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setQna(res.DATA.data);
            setStatus(res.DATA.stat);
            setTotal(res.DATA.total);
          }
        })
        .then(() => setLoading(false));
    }

    return () => {
      setCurrentPage(1);
    };
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(total / offset));
  }, [total]);

  return (
    <Layout>
      <Text style={styles.title}>1:1 문의 내역</Text>
      {loading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : (
        <>
          <FlatList
            style={styles.main}
            data={qna}
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
          {/* <ScrollView style={styles.main} ref={scrollViewRef}>
            {qna.map((item) => {
              return (
                
              );
            })}
          </ScrollView> */}
          <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 10 }}>
            {totalPage > 1 && <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
          </View>
        </>
      )}
    </Layout>
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
    backgroundColor: "#ebf2f0",
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
    // fontSize: 16,
    // fontFamily: "Gill Sans",
    // fontWeight: "bold",
    textAlign: "center",
    margin: 5,
    color: "#cc2b5e",
    backgroundColor: "transparent",
  },
});
export default QnaList;
