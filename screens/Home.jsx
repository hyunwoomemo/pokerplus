import React from "react";
import { ActivityIndicator, Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout";
import styled from "styled-components/native";
import Carousel from "../components/Carousel";
import { useState, useEffect, useContext } from "react";
import { PosterContext } from "../context";
import { OneSignal } from "react-native-onesignal";
import { authState } from "../recoil/auth/atom";
import { useRecoilState } from "recoil";

const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 20px;
`;

const screenWidth = Math.round(Dimensions.get("window").width);

const Home = () => {
  const { poster, setPoster } = useContext(PosterContext);
  const [user, setUser] = useRecoilState(authState);

  useEffect(() => {
    OneSignal.login(user.email);
  }, []);

  return (
    <Layout>
      <Container>
        {/* {!isLoading && */}
        <Carousel gap={4} offset={36} data={poster} pageWidth={screenWidth - (4 + 36) * 2} />
        {/* {isLoading && (
          <View>
            <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" />
          </View>
        )} */}
      </Container>
    </Layout>
  );
};

export default Home;
