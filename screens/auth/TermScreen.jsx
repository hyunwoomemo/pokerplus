import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import ScreenLayout from "../../components/ScreenLayout";
import styled from "styled-components/native";

const Title = styled.Text`
  font-size: 24px;
  padding-top: 15px;
  font-weight: 900;
`;

const MainWrapper = styled.View`
  margin-top: 30px;
  background-color: #f9ecea;
  flex: 1
`;

const MainText = styled.Text``;

const TermScreen = ({
  route: {
    params: { type, text },
  },
}) => {
  return (
    <ScreenLayout back={true}>
      <View style={{flex: 1}}>
        <Title>{text}</Title>
        <MainWrapper>
          <MainText>{type}</MainText>
        </MainWrapper>
        {/**
         * type으로 api 호출하기
         * */}
      </View>
    </ScreenLayout>
  );
};

export default TermScreen;
