import React from "react";
import { ActivityIndicator, Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout";
import styled from "styled-components/native";
import Carousel from "../components/Carousel";
import { useState, useEffect, useContext } from "react";
import { OneSignal } from "react-native-onesignal";
import { authState } from "../recoil/auth/atom";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { resourceApi } from "../api";

const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 20px;
`;

const screenWidth = Math.round(Dimensions.get("window").width);

const Home = () => {
  const { data, isLoading, isError } = useQuery(["poster"], resourceApi.posters);
  const [user, setUser] = useRecoilState(authState);

  useEffect(() => {
    OneSignal.login(user.email);
  }, []);

  return (
    <Layout>
      <Container>
        <Carousel gap={4} offset={36} data={data?.DATA} pageWidth={screenWidth - (4 + 36) * 2} />
      </Container>
    </Layout>
  );
};

export default Home;
