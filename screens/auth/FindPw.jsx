import React from "react";
import { Image, Linking, SafeAreaView, TouchableOpacity, View } from "react-native";
import BackBtn from "../../components/BackBtn";
import Title from "../../components/Title";
import styled from "styled-components/native";
import { Icon } from "../../source";
import AppBar from "../../components/AppBar";
import ScreenLayout from "../../components/ScreenLayout";

const Container = styled.View`
  padding: 20px;
  background-color: #fff;
  flex: 1;
`;

const FindPw = () => {
  const handleCheckAuth = async () => {
    try {
      Linking.openURL(`https://ngapi.dev.pokerzone.io/auth/create?next=pokerplusapp://findpwsuccess?`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScreenLayout title="비밀번호 찾기">
      <TouchableOpacity onPress={handleCheckAuth} style={{ paddingTop: 50, alignItems: "center" }}>
        <Image source={{ uri: Icon.checkPhone }} width={140} height={140} />
      </TouchableOpacity>
    </ScreenLayout>
  );
};

export default FindPw;
