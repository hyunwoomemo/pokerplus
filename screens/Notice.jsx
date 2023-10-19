import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Layout from "../components/Layout";
import { customerApi } from "../api";
import moment from "moment";
import Pagination from "../components/Pagination";
import { NoticeContext } from "../context";

const Notice = ({ navigation }) => {
  const [notice, setNotice] = useState();
  const [offset, setOffset] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const { currentPage, setCurrentPage } = useContext(NoticeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!notice) {
      customerApi
        .noticeList({
          board_id: "notice",
          offset,
          page: currentPage,
        })
        .then((res) => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

          setTotal(res.DATA.total);
          setNotice(res.DATA.data);
        })
        .then(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    customerApi
      .noticeList({
        board_id: "notice",
        offset,
        page: currentPage,
      })
      .then((res) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        setTotal(res.DATA.total);
        setNotice(res.DATA.data);
      })
      .then(() => setLoading(false));
  }, [currentPage]);

  useEffect(() => {
    setTotalPage(Math.ceil(total / offset));
  }, [total]);

  return (
    <Layout>
      {loading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : (
        <>
          <Text style={{ textAlign: "center", fontSize: 16, paddingVertical: 20 }}>공지사항</Text>
          <FlatList
            data={notice}
            keyExtractor={(item, index) => index}
            // horizontal
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ padding: 20, gap: 5, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.1)" }}
                onPress={() =>
                  navigation.navigate("NoticeDetail", {
                    notice: notice,
                    index: index,
                  })
                }
              >
                <Text>{item.subject}</Text>
                <Text style={{ color: "gray" }}>{moment(item.created_at).utc().format("YY/MM/DD")}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 20 }}>
            {totalPage > 1 && <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
          </View>
        </>
      )}
    </Layout>
  );
};

export default Notice;
