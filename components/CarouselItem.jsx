import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Animated, Image, Linking, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { opacityAnimation } from "../animations/opacityAnimation";
import { Surface } from "react-native-paper";
import FastImage from "react-native-fast-image";

const PageItem = styled.Pressable`
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const PosterImg = styled(FastImage)`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default function Page({ item, index, style, setLoad }) {
  const opacity = useRef(new Animated.Value(1)).current;

  return (
    <PageItem color={item.color} style={{ ...style, backgroundColor: "#ececec" }} onPress={() => Linking.openURL(item.link)}>
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
