import React, { useEffect, useState } from "react";
import { LayoutAnimation, Platform, StyleSheet, Text, View } from "react-native";
import BackBtn from "../components/BackBtn";
import Title from "../components/Title";
import { resourceApi } from "../api";

const PolicyDetail = ({ route }) => {
  const { name, type } = route.params;
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (result.length === 0) {
      resourceApi.policys(type).then((res) => {
        if (res.CODE === "PL000") {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setResult(res.DATA[0]);
        }
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && <BackBtn />}
      <Title text={result?.title} />
      <Text style={styles.result}>{result?.contents}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  result: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default PolicyDetail;
