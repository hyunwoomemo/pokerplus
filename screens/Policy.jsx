import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Layout from "../components/Layout";
import Title from "../components/Title";
import AppBar from "../components/AppBar";
import { useQueryClient } from "@tanstack/react-query";
import { resourceApi } from "../api";
import ScreenLayout from "../components/ScreenLayout";

const Policy = ({ navigation }) => {
  const queryClient = useQueryClient();

  queryClient.prefetchQuery(["policy", "Provision"], () => resourceApi.policys("Provision"));
  queryClient.prefetchQuery(["policy", "Privacy"], () => resourceApi.policys("Privacy"));
  queryClient.prefetchQuery(["policy", "Position"], () => resourceApi.policys("Position"));

  const policy = [
    { text: "서비스 이용 약관 (필수)", name: "서비스 이용 약관", type: "Provision" },
    { text: "개인 정보 수집 및 이용 약관 (필수)", name: "PersonalInfo", type: "Privacy" },
    { text: "위치 정보 이용 약관 (필수)", name: "Location", type: "Position" },
  ];
  return (
    <ScreenLayout title="약관 및 정책">
      <View style={styles.container}>
        {policy.map((item) => (
          <View key={item.type} style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("PolicyDetail", { text: item.type, name: item.name, type: item.type })}>
              <Text style={styles.button}>보기</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  itemText: {
    fontSize: 16,
  },
  button: {
    color: "#ff3183",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default Policy;
