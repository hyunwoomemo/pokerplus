import React from "react";
import { Image, Linking, TouchableOpacity, View, SafeAreaView } from "react-native";
import BackBtn from "../../components/BackBtn";
import Title from "../../components/Title";
import styled from "styled-components/native";
import { Icon } from "../../source";
import AppBar from "../../components/AppBar";

const Container = styled.View`
  padding: 20px;
  background-color: #fff;
  flex: 1;
`;

const FindId = () => {
  const handleCheckAuth = async () => {
    try {
      Linking.openURL(`https://ngapi.dev.pokerzone.io/auth/create?next=pokerplusapp://findidsuccess?`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="이메일 찾기" />
      <TouchableOpacity onPress={handleCheckAuth} style={{ paddingTop: 50, alignItems: "center" }}>
        <Image source={{ uri: Icon.checkPhone }} width={140} height={140} />
      </TouchableOpacity>
      {/* </Container> */}
    </View>
  );
};

export default FindId;
