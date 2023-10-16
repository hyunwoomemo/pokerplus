import React from "react";
import styled from "styled-components/native";
import BackBtn from "./BackBtn";
import { ScrollView, View } from "react-native";
import Title from "./Title";

const ScreenLayout = ({ back, children, title }) => {
  const Container = styled.View`
    padding: 20px;
    background-color: #fff;
    flex: 1;
  `;

  return (
    <Container>
      {back && <BackBtn />}
      {title && <Title text={title} />}
      {children}
    </Container>
  );
};

export default ScreenLayout;
