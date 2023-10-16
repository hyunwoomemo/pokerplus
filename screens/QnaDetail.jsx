import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ActivityIndicator, LayoutAnimation, StyleSheet, Text, View } from "react-native";
import { WithTitleBackBtn } from "../components/BackBtn";
import moment from "moment";
import { customerApi } from "../api";

const QnaDetail = ({ route }) => {
  const { qna } = route.params;

  const [loading, setLoading] = useState(true);
  const [qnaItem, setQnaItem] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [prevItem, setPrevItem] = useState([]);

  console.log(answer);

  useEffect(() => {
    customerApi
      .customerItem(qna.id)
      .then((res) => {
        if (res.CODE === "DCR000") {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setQnaItem(res.DATA.data);
          setAnswer(res.DATA.answer);
          setPrevItem(res.DATA.prev);
        }
      })
      .then(() => setLoading(false));
  }, [route.params.qna]);

  useEffect(() => {
    if (qnaItem.length === 0) {
      customerApi
        .customerItem(qna.id)
        .then((res) => {
          if (res.CODE === "DCR000") {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setQnaItem(res.DATA.data);
            setAnswer(res.DATA.answer);
            setPrevItem(res.DATA.prev);
          }
        })
        .then(() => setLoading(false));
    }
  }, []);

  return (
    <Layout>
      <WithTitleBackBtn title={qna.subject} subTitle={moment(qna.created_at).utc().format("YY/MM/DD")} />
      <View style={styles.container}>
        <Text style={styles.contentsTitle}>문의 내용</Text>
        <View style={styles.contentsWrapper}>
          <Text>{qna.contents}</Text>
        </View>
      </View>
      {answer?.length > 0 && (
        <View style={styles.container}>
          <Text style={styles.contentsTitle}>답변 내용</Text>
          <View style={styles.contentsWrapper}>
            <Text>{answer?.contents}</Text>
          </View>
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
  },
  contentsTitle: {
    fontSize: 16,
  },
  contentsWrapper: {
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default QnaDetail;
