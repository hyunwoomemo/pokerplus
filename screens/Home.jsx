import React from "react";
import { ActivityIndicator, Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout";
import styled from "styled-components/native";
import Carousel from "../components/Carousel";
import { resourceApi } from "../api";
import { useState, useEffect, useContext } from "react";
import { PosterContext } from "../context";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/auth/atom";
import axios from "axios";

const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 20px;
`;

const screenWidth = Math.round(Dimensions.get("window").width);

const Home = () => {
  const { poster, setPoster } = useContext(PosterContext);
  const { user, setUser } = useRecoilState(authState);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer YzFmMTg5NWUtOTI1MC00NjZlLWFjYjMtMGZjNmUwODgzNWYx`,
    };
    const handlePush = async () => {
      const res = await axios.post(
        "https://onesignal.com/api/v1/notifications",
        {
          app_id: "ae232b11-fde8-419d-8069-9ec35bf73f62",
          include_aliases: { external_id: [user.user_id] },
          target_channel: "push",
          data: { foo: "bar" },
          contents: { en: "hi" },
        },
        {
          headers,
        }
      );

      console.log(res);
    };

    handlePush();
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
