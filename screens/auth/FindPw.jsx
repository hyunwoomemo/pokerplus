import React from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
import BackBtn from "../../components/BackBtn";
import Title from "../../components/Title";
import styled from "styled-components/native";
import { Icon } from "../../source";

const Container = styled.View`
  padding: 20px;
  background-color: #fff;
  flex: 1;
`;

const FindPw = () => {
  const handleCheckAuth = async () => {
    console.log("본인인증 페이지 이동");
    try {
      Linking.openURL(`https://ngapi.dev.pokerzone.io/auth/create?next=pokerplusapp://findpwsuccess?`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <BackBtn />
      <Title text="본인 인증" />
      <TouchableOpacity onPress={handleCheckAuth} style={{ paddingTop: 50, alignItems: "center" }}>
        <Image source={{ uri: Icon.checkPhone }} width={140} height={140} />
      </TouchableOpacity>
    </Container>
  );
};

export default FindPw;
