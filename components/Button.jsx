import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled.View`
  padding: 18px 20px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.disabled ? "#cfcfcf" : props.dark ? "#383838" : "transparent")};
  border: ${(props) => (props.primary || props.dark || props.disabled ? 0 : "2px solid black")};
`;

const ButtonText = styled.Text`
  font-weight: bold;
  color: ${(props) => (props.disabled ? "#797979" : props.primary || props.dark ? "#fff" : "#000")};
  font-size: 16px;
  /* min-width: 100px;
  text-align: center; */
`;

const Button = ({ onPress, loading, label, style, disabled, primary, dark }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={style && { ...style }}>
      {primary ? (
        <LinearGradient colors={disabled ? ["gray", "gray"] : ["#fe806a", "#ff3183"]} start={{ x: 0.3, y: 0.1 }} style={{ borderRadius: 15 }} end={{ x: 0.9, y: 0.1 }}>
          <Wrapper primary>
            <ButtonText primary>{loading ? <ActivityIndicator color="#fff" size={15} /> : label}</ButtonText>
          </Wrapper>
        </LinearGradient>
      ) : (
        <Wrapper dark={dark} disabled={disabled}>
          <ButtonText dark={dark} disabled={disabled}>
            {loading ? <ActivityIndicator color="#ff3183" size={15} /> : label}
          </ButtonText>
        </Wrapper>
      )}
    </TouchableOpacity>
  );
};

export default Button;
