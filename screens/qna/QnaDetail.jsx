import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ActivityIndicator, LayoutAnimation, StyleSheet, Text, View } from "react-native";
import { WithTitleBackBtn } from "../../components/BackBtn";
import moment from "moment";
import { customerApi } from "../../api";
import ScreenLayout from "../../components/ScreenLayout";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import Error from "../../components/Error";

const QnaDetail = ({ route }) => {
  const { qna } = route.params;

  const [loading, setLoading] = useState(true);
  const [qnaItem, setQnaItem] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [prevItem, setPrevItem] = useState([]);

  const { data, isLoading, isError } = useQuery(["qnaDetail"], () => customerApi.customerItem(qna.id));

  if (isError) {
    return <Error />;
  }

  return (
    <ScreenLayout title={qna.subject}>
      <Text style={{ marginLeft: "auto", color: "gray", marginBottom: 20 }}>{moment(qna.created_at).utc().format("YY/MM/DD")}</Text>
      <View style={styles.container}>
        <Text style={styles.contentsTitle}>문의 내용</Text>
        <View style={{ ...styles.contentsWrapper, marginTop: 15 }}>
          <Text>{qna.contents}</Text>
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size={"large"} color={"#ff3183"} style={StyleSheet.absoluteFillObject} />
      ) : (
        data?.DATA.answer && (
          <View style={{ ...styles.container, marginTop: 20 }}>
            <Text style={{ ...styles.contentsTitle, color: "#ff3183" }}>스포패스 관리자</Text>
            <LinearGradient colors={["#fe806a", "#ff3183"]} start={{ x: 0.3, y: 0.1 }} style={{ borderRadius: 10, marginTop: 15 }} end={{ x: 0.9, y: 0.1 }}>
              <View style={{ ...styles.contentsWrapper, backgroundColor: "#fff" }}>
                <Text>{data.DATA.answer?.contents}</Text>
              </View>
            </LinearGradient>
          </View>
        )
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentsTitle: {
    fontSize: 16,
  },
  contentsWrapper: {
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 20,
    margin: 2,
    borderRadius: 10,
  },
});

export default QnaDetail;
