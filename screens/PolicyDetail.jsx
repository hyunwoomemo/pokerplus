import React, { useEffect, useState } from "react";
import { LayoutAnimation, Platform, StyleSheet, Text, View } from "react-native";
import BackBtn from "../components/BackBtn";
import Title from "../components/Title";
import { resourceApi } from "../api";
import { useQuery } from "@tanstack/react-query";

const PolicyDetail = ({ route }) => {
  const { name, type } = route.params;
  const [result, setResult] = useState([]);

  const { data } = useQuery(["policy", type], () => resourceApi.policys(type));

  console.log(data);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setResult(data?.DATA[0]);
  }, [data]);

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
    backgroundColor: "#ecf2f0",
  },
  result: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default PolicyDetail;
