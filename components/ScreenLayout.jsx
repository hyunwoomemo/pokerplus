import React from "react";
import styled from "styled-components/native";
import BackBtn from "./BackBtn";
import { ScrollView, View } from "react-native";

const ScreenLayout = ({ back, children, scroll }) => {
  const Container = styled.View`
    padding: 20px;
    background-color: #fff;
    flex: 1;
  `;

  return (
    <Container>
      {back && <BackBtn />}
      {children}
    </Container>
  );
};

export default ScreenLayout;
