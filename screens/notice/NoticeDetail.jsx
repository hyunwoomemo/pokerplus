import React from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import Button from "../../components/Button";
import ScreenLayout from "../../components/ScreenLayout";

const NoticeDetail = ({ navigation: { goBack }, route }) => {
  const { notice, index } = route.params;
  return (
    <ScreenLayout title={notice[index].subject}>
      <Text style={{ marginLeft: "auto", fontSize: 14, color: "gray" }}>{moment(notice[index].created_at).utc().format("YY/MM/DD")}</Text>
      <Text style={styles.contents}>{notice[index].contents}</Text>
      <Button label="     목록    " style={styles.button} onPress={() => goBack()} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  contents: {
    paddingVertical: 20,
    fontSize: 16,
  },
  button: {
    alignItems: "center",
    paddingVertical: 30,
  },
});

export default NoticeDetail;
