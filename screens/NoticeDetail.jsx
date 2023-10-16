import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout";
import BackBtn, { WithSubTitleBackBtn, WithTitleBackBtn } from "../components/BackBtn";
import moment from "moment";
import Button from "../components/Button";

const NoticeDetail = ({ navigation: { navigate, goBack }, route }) => {
  const { notice, index } = route.params;
  return (
    <Layout>
      <WithTitleBackBtn title={notice[index].subject} subTitle={moment(notice[index].created_at).utc().format("YY/MM/DD")} />
      <Text style={styles.contents}>{notice[index].contents}</Text>
      <Button label="목록" style={styles.button} onPress={() => goBack()} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  contents: {
    padding: 20,
  },
  button: {
    alignItems: "center",
    paddingVertical: 30,
  },
});

export default NoticeDetail;
