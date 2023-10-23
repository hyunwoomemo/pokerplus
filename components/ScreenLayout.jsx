import React from "react";
import styled from "styled-components/native";
import BackBtn from "./BackBtn";
import { ScrollView, View } from "react-native";
import Title from "./Title";
import AppBar from "./AppBar";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  padding: 20px;
  background-color: #fff;
  flex: 1;
`;
const ScreenLayout = ({ back, children, title }) => {
  const navigation = useNavigation();

  return (
    <Container>
      <AppBar title={title} back={back ? back : () => navigation.goBack()} />
    </Container>
  );
};

export default ScreenLayout;
