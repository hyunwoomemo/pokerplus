import React, { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import Layout from "../components/Layout";
import styled from "styled-components/native";
import Carousel from "../components/Carousel";
import { authApi, resourceApi } from '../api';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from '../source';
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/account/atom';


const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 20px;
`;

const screenWidth = Math.round(Dimensions.get("window").width);

const Home = () => {
  const [auth, setAuth] = useRecoilState(authState)

  const { isLoading, data } = useQuery(['resource', 'poster'], resourceApi.posters)
  const { isLoading: infoLoading, data: infoData, isSuccess } = useQuery(['auth', 'info'], authApi.info)

  useEffect(() => {
    if (isSuccess) {
      // AsyncStorage.setItem('user_info', JSON.stringify(infoData.DATA))
      setAuth(infoData.DATA)
  }
  }, [isSuccess])

  console.log(auth)

  return (
    <Layout>
      <Container >
        {!isLoading && data.DATA &&
          <Carousel gap={4} offset={36} data={data.DATA} pageWidth={screenWidth - (4 + 36) * 2} />}
        {isLoading && <View><Text>Loading...</Text></View>}
      </Container>
    </Layout>
  );
};

export default Home;
