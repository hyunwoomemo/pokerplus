import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Layout from "../../components/Layout";
import ScreenLayout from "../../components/ScreenLayout";
import Button from "../../components/Button";
import { WithLabelDisableInput } from "../../components/Input";
import styled from "styled-components/native";
import { useRecoilState } from "recoil";
import { authState } from "../../recoil/auth/atom";
import BackBtn, { WithTitleBackBtn } from "../../components/BackBtn";
import { opacityAnimation } from "../../animations/opacityAnimation";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../../api";
import FastImage from "react-native-fast-image";
import { imageCache } from "../../recoil/imageCache/atom";

const Title = styled.Text`
  text-align: center;
  margin: 30px 0;
  font-size: 18px;
  font-weight: bold;
`;

const Profile = ({ navigation }) => {
  const [ticketCount, setTicketCount] = useState(0);
  const [cache, setCache] = useRecoilState(imageCache);
  const { data, isLoading, isError } = useQuery(["user"], authApi.info);
  console.log(data);

  useEffect(() => {
    const count = data.DATA.ticket_info?.reduce((acc, cur) => acc + cur.ticket_count, 0);
    setTicketCount(count);
  }, [data?.DATA.ticket_info]);

  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }, []);

  const opacity = useRef(new Animated.Value(1)).current;

  return (
    <ScreenLayout title="내 프로필">
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", paddingVertical: 30 }}>
          <Animated.View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: "rgba(0,0,0,0.2)", opacity: opacity }}>
            <FastImage
              source={{ uri: `${data?.DATA?.user_profile_url}` }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
              }}
              // width={120}
              // height={120}
              // borderRadius={60}
              resizeMode="cover"
              onLoadStart={() => opacityAnimation(opacity, "start")}
              onLoadEnd={() => opacityAnimation(opacity, "reset")}
            />
          </Animated.View>
        </View>
        <Button onPress={() => navigation.navigate("InfoCheck")} dark label=" 정보 수정 " style={{ alignItems: "center" }} />
        <View>
          <WithLabelDisableInput value={data.DATA.name}>
            <Text>이름</Text>
          </WithLabelDisableInput>
          <WithLabelDisableInput value={data.DATA.eng_name}>
            <Text>영문 이름 (GPI등재용)</Text>
          </WithLabelDisableInput>
          <WithLabelDisableInput value={data.DATA.ticket_info ? `${ticketCount}장` : "0장"}>
            <Text>보유 참가권</Text>
          </WithLabelDisableInput>
          <WithLabelDisableInput value={data.DATA.hp}>
            <Text>연락처</Text>
          </WithLabelDisableInput>
          <WithLabelDisableInput value={data.DATA.email}>
            <Text>이메일</Text>
          </WithLabelDisableInput>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Leave")} style={{ alignItems: "center", paddingVertical: 40 }}>
          <Text style={{ textDecorationLine: "underline", color: "gray" }}>회원 탈퇴</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenLayout>
  );
};

Profile.navigationOptions = {
  tabBarVisible: true,
};

export default Profile;
