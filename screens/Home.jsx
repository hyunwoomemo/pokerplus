import React from "react";
import { ActivityIndicator, Alert, Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout";
import styled from "styled-components/native";
import Carousel from "../components/Carousel";
import { useState, useEffect, useContext } from "react";
import { OneSignal } from "react-native-onesignal";
import { authState } from "../recoil/auth/atom";
import { useRecoilState } from "recoil";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, customerApi, pushApi, resourceApi, ticketApi } from "../api";
import { pushState } from "../recoil/push/atom";
import * as SplashScreen from "expo-splash-screen";
import { getStorage, removeStorage, setStorage } from "../utils/asyncStorage";
import { offsetValue } from "../config";
import ModalComponent from "../components/Modal";
import moment from "moment";
import Button from "../components/Button";

const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 20px;
`;

const screenWidth = Math.round(Dimensions.get("window").width);

const Home = () => {
  const { data, isLoading, isError } = useQuery(["poster"], resourceApi.posters);
  const [user, setUser] = useRecoilState(authState);
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  queryClient.prefetchQuery(["pushUnRead"], pushApi.unReadCheck);

  const hideModal = () => {
    setVisible(false);
  };

  OneSignal.Notifications.addEventListener("permissionChange", async (granted) => {
    if (granted) {
      await setStorage("isPushEnabled", true);
      setVisible(true);
    } else {
      await setStorage("isPushEnabled", false);
    }
  });

  useEffect(() => {
    OneSignal.login(user.email);
    if (OneSignal.User.pushSubscription.getOptedIn()) {
      const setPush = async () => {
        if (OneSignal.User.pushSubscription.getOptedIn()) {
          await setStorage("isPushEnabled", true);
        } else {
          await setStorage("isPushEnabled", false);
        }

        setPush();
      };
    }
  }, [user]);

  useEffect(() => {
    const prefetch = async () => {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 2000);

      queryClient.prefetchQuery(["poster"], resourceApi.posters);
      queryClient.prefetchQuery(["notice", 1], () => customerApi.noticeList({ board_id: "notice", offset: offsetValue, page: 1 }));
      queryClient.prefetchQuery(["myticket"], ticketApi.list);
      queryClient.prefetchQuery(["qna", 1], () => customerApi.customerList(0, offsetValue, 1));
      queryClient.prefetchQuery(["user"], authApi.info);
      queryClient.prefetchQuery(["faq", 1], () => customerApi.faqList(offsetValue, 1));
    };

    prefetch();
  }, []);

  return (
    <Layout>
      <Container>
        <Carousel gap={4} offset={36} data={data?.DATA} pageWidth={screenWidth - (4 + 36) * 2} />
      </Container>
      <ModalComponent visible={visible} hideModal={hideModal}>
        <View style={{ padding: 10, gap: 20, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>광고성 정보 푸시 동의</Text>
          <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 24 }}>서비스와 관련된 소식, 이벤트 안내, 고객 혜택 등 다양한 정보를 제공합니다.</Text>
          <Text style={{ color: "gray" }}>{moment(new Date()).utc().format("YYYY년 MM월 DD일")}</Text>
          <Button label="닫기" onPress={() => setVisible(false)} style={{ width: "100%" }} />
        </View>
      </ModalComponent>
    </Layout>
  );
};

export default Home;
