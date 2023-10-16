import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import BackBtn from "../../components/BackBtn";
import Title from "../../components/Title";
import { authApi } from "../../api";
import Button from "../../components/Button";

const Container = styled.View`
  padding: 20px;
  background-color: #fff;
  flex: 1;
`;

const FindIdSuccess = ({ navigation: { navigate }, route }) => {
  console.log(route.params);
  const { authkey, user_id } = route.params;

  const [authInfo, setAuthInfo] = useState();

  useEffect(() => {
    if (!authInfo) {
      try {
        authApi.authInfo(authkey).then((res) => {
          if (res.CODE === "AAI000") {
            setAuthInfo(res.DATA);
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  return (
    <Container>
      <BackBtn />
      <Title text="이메일 찾기 성공" />
      {authInfo?.name && <Text style={{ marginTop: 30 }}>{`${authInfo?.name}님의 이메일은 아래와 같습니다.`}</Text>}
      <View
        style={{
          padding: 32,
          marginVertical: 20,
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 20,
          shadowColor: "gray",
          shadowOpacity: 0.5,
          shadowRadius: 7,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        }}
      >
        {authInfo?.user_id && <Text style={{ fontSize: 24 }}>{`${authInfo?.user_id}`}</Text>}
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
        <Button dark style={{ flex: 1 }} label="로그인" onPress={() => navigate("Login")} />
        <Button style={{ flex: 1 }} primary={true} label="비밀번호 찾기" />
      </View>
    </Container>
  );
};

export default FindIdSuccess;
