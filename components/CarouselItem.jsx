import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Animated, Image, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { opacityAnimation } from "../animations/opacityAnimation";
import { Surface } from "react-native-paper";

const PageItem = styled.View`
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-top: 20px;
`;

const PosterImg = styled.Image`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PosterWrapper = styled.TouchableHighlight`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function Page({ item, index, style, setLoad }) {
  const { width, height } = Dimensions.get("window");

  const opacity = useRef(new Animated.Value(1)).current;

  return (
    <PageItem color={item.color} style={{ ...style, backgroundColor: "lightgray" }}>
      <PosterImg
        source={{ uri: item.poster_url }}
        // defaultSource={require("../assets/splash.jpg")}
        resizeMode={"contain"}
        style={{ borderRadius: 15 }}
        onLoadStart={() => opacityAnimation(opacity, "start")}
        onLoadEnd={() => {
          setLoad((prev) => [...prev, index]);
          opacityAnimation(opacity, "reset");
        }}
      />
    </PageItem>
  );
}
