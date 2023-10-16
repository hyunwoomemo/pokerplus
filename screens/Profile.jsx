import React, { useEffect, useRef } from "react";
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Layout from "../components/Layout";
import ScreenLayout from "../components/ScreenLayout";
import Button from "../components/Button";
import { WithLabelDisableInput } from "../components/Input";
import styled from "styled-components/native";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/auth/atom";
import BackBtn, { WithTitleBackBtn } from "../components/BackBtn";
import { opacityAnimation } from "../animations/opacityAnimation";

const Title = styled.Text`
  text-align: center;
  margin: 30px 0;
  font-size: 18px;
  font-weight: bold;
`;

const Profile = ({ navigation }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const { user_profile_url, name, eng_name, ticket_info, hp, email } = auth;

  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }, []);

  const opacity = useRef(new Animated.Value(1)).current;

  return (
    <Layout>
      {/* <WithTitleBackBtn title="내 프로필" /> */}
      <Title>내 프로필</Title>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", paddingVertical: 30 }}>
          <Animated.View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: "rgba(0,0,0,0.2)", opacity: opacity }}>
            <Image
              source={{ uri: user_profile_url }}
              width={120}
              height={120}
              borderRadius={60}
              resizeMode="cover"
              onLoadStart={() => opacityAnimation(opacity, "start")}
              onLoadEnd={() => opacityAnimation(opacity, "reset")}
            />
          </Animated.View>
        </View>
        <Button onPress={() => navigation.navigate("InfoCheck")} dark label=" 정보 수정 " style={{ alignItems: "center" }} />
        <View style={{ paddingHorizontal: 32 }}>
          <WithLabelDisableInput value={name}>
            <Text>이름</Text>
          </WithLabelDisableInput>
          <WithLabelDisableInput value={eng_name}>
            <Text>영문 이름 (GPI등재용)</Text>
          </WithLabelDisableInput>
          <WithLabelDisableInput value={ticket_info ? ticket_info : "0장"}>
            <Text>보유 참가권</Text>
          </WithLabelDisableInput>
          <WithLabelDisableInput value={hp}>
            <Text>연락처</Text>
          </WithLabelDisableInput>
          <WithLabelDisableInput value={email}>
            <Text>이메일</Text>
          </WithLabelDisableInput>
        </View>
        <TouchableOpacity style={{ alignItems: "center", paddingVertical: 40 }}>
          <Text style={{ textDecorationLine: "underline", color: "gray" }}>회원 탈퇴</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

Profile.navigationOptions = {
  tabBarVisible: true,
};

export default Profile;
