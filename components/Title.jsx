import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Title = ({ text, ...rest }) => {
  const BoldText = styled.Text`
    font-weight: 900;
    font-size: 28px;
    padding: 10px;
  `;

  return (
    <View {...rest}>
      <BoldText>{text}</BoldText>
    </View>
  );
};

export default Title;
