import React from "react";
import { Dimensions, Text, View } from "react-native";
import Layout from "../components/Layout";
import styled from "styled-components/native";
import Carousel from "../components/Carousel";
import { resourceApi } from "../api";
import { useQuery } from "@tanstack/react-query";

const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 20px;
`;

const screenWidth = Math.round(Dimensions.get("window").width);

const Home = () => {
  const { isLoading, data } = useQuery(["resource", "poster"], resourceApi.posters);
  // console.log(data)
  return (
    <Layout>
      <Container>
        {!isLoading && <Carousel gap={4} offset={36} data={data.DATA} pageWidth={screenWidth - (4 + 36) * 2} />}
        {isLoading && (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
      </Container>
    </Layout>
  );
};

export default Home;
