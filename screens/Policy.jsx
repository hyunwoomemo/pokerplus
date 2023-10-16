import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Layout from "../components/Layout";
import Title from "../components/Title";

const Policy = ({ navigation }) => {
  const policy = [
    { text: "서비스 이용 약관 (필수)", name: "서비스 이용 약관", type: "Provision" },
    { text: "개인 정보 수집 및 이용 약관 (필수)", name: "PersonalInfo", type: "Privacy" },
    { text: "위치 정보 이용 약관 (필수)", name: "Location", type: "Position" },
  ];
  return (
    <Layout>
      <Title text="약관 및 정책" style={{ marginTop: 20 }} />
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  itemText: {},
  button: {
    color: "#ff3183",
    textDecorationLine: "underline",
  },
});

export default Policy;
