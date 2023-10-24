import React from "react";
import { Image, Linking, TouchableOpacity, View, SafeAreaView } from "react-native";
import BackBtn from "../../components/BackBtn";
import Title from "../../components/Title";
import styled from "styled-components/native";
import { Icon } from "../../source";
import AppBar from "../../components/AppBar";
import ScreenLayout from "../../components/ScreenLayout";

const FindId = () => {
  const handleCheckAuth = async () => {
    try {
      Linking.openURL(`https://ngapi.dev.pokerzone.io/auth/create?next=pokerplusapp://findidsuccess?`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScreenLayout title="이메일 찾기">
      <TouchableOpacity onPress={handleCheckAuth} style={{ paddingTop: 50, alignItems: "center" }}>
        <Image source={{ uri: Icon.checkPhone }} width={140} height={140} />
      </TouchableOpacity>
    </ScreenLayout>
  );
};

export default FindId;
