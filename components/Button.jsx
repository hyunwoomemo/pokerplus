import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled.View`
  padding: 18px 20px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  border: ${(props) => (props.primary ? 0 : "2px solid black")};
`;

const ButtonText = styled.Text`
  font-weight: bold;
  color: ${(props) => (props.primary ? "#fff" : "#000")};
`;

const Button = ({ onPress, label, style, disabled, primary }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={style && { ...style }}>
      {primary ? (
        <LinearGradient colors={disabled ? ["gray", "gray"] : ["#fe806a", "#ff3183"]} start={{ x: 0.3, y: 0.1 }} style={{ borderRadius: 30 }} end={{ x: 0.9, y: 0.1 }}>
          <Wrapper primary>
            <ButtonText primary>{label}</ButtonText>
          </Wrapper>
        </LinearGradient>
      ) : (
        <Wrapper>
          <ButtonText>{label}</ButtonText>
        </Wrapper>
      )}
    </TouchableOpacity>
  );
};

export default Button;
