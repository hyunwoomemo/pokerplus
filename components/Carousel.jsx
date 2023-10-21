import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import CarouselItem from "./CarouselItem";
import { LinearGradient } from "expo-linear-gradient";
// import SplashScreen from "react-native-splash-scireen";
import * as SplashScreen from "expo-splash-screen";
import { OneSignal } from "react-native-onesignal";
import axios from "axios";
import { authState } from "../recoil/auth/atom";
import { useRecoilState } from "recoil";

const Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const ItemTitleWrapper = styled(Animated.createAnimatedComponent(View))`
  /* padding-bottom: 10px; */
  align-items: center;
`;
const ItemTitle = styled.Text`
  padding: 7px 10px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
`;

const Carousel = ({ data, pageWidth, gap, offset }) => {
  const [load, setLoad] = useState([]);
  useEffect(() => {
    const hidleSplash = async () => {
      await SplashScreen.hideAsync();
    };
    if (load.length === 3) {
      hidleSplash();
    }
  }, [data, load]);
  const scrollX = useRef(new Animated.Value(0)).current;

  function renderItem(item, index, scrollX) {
    const inputRange = [(index - 1) * pageWidth, index * pageWidth, (index + 1) * pageWidth];

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    });

    const titleOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
    });

    return (
      <Animated.View style={[{ opacity, transform: [{ scale }] }]}>
        <ItemTitleWrapper style={{ opacity: titleOpacity }}>
          <LinearGradient colors={["#bc20a7", "#4c56fa"]} start={{ x: 0.3, y: 0.1 }} style={{ borderRadius: 30, width: "80%" }} end={{ x: 0.9, y: 0.1 }}>
            <View style={{ borderRadius: 30, backgroundColor: "#fff", marginVertical: 2, marginHorizontal: 2, paddingVertical: 5 }}>
              <ItemTitle>{item.title}</ItemTitle>
            </View>
          </LinearGradient>
        </ItemTitleWrapper>
        <CarouselItem setLoad={setLoad} item={item} index={index} style={{ width: pageWidth, marginHorizontal: gap / 2, flex: 1 }} />
      </Animated.View>
    );
  }

  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer YzFmMTg5NWUtOTI1MC00NjZlLWFjYjMtMGZjNmUwODgzNWYx`,
  };

  const [user, setUser] = useRecoilState(authState);

  const handlePush = async () => {
    console.log(user);
    fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      body: JSON.stringify({
        app_id: "ae232b11-fde8-419d-8069-9ec35bf73f62",
        include_aliases: { external_id: [user.email] },
        target_channel: "push",
        data: { foo: "bar" },
        contents: { en: user.name },
      }),
      headers: headers,
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  return (
    <Container>
      <TouchableOpacity onPress={handlePush}>
        <Text>clickdskflk</Text>
      </TouchableOpacity>
      <Animated.FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={data}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item, index) => `page__${item.title}__${index}`}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        // scrollEventThrottle={12}
        pagingEnabled
        renderItem={({ item, index }) => renderItem(item, index, scrollX, setLoad)}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default Carousel;
