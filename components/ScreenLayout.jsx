import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components/native";
import BackBtn from "./BackBtn";
import { Animated, Easing, Platform, SafeAreaView, ScrollView, View } from "react-native";
import Title from "./Title";
import AppBar from "./AppBar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Container = styled.View`
  /* background-color: #ecf2f0; */
  background-color: ${(props) => props.backgroundColor || "#ecf2f0"};
  flex: 1;
`;
const ScreenLayout = ({ back, children, title, appbar, action, backgroundColor, side }) => {
  const navigation = useNavigation();

  const topBottom = useRef(new Animated.Value(-10)).current;
  const move = useRef(new Animated.Value(10)).current;

  const opacity = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.timing(topBottom, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).start();
      Animated.timing(opacity, {
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.linear,
        duration: 800,
      }).start();

      return () => {
        Animated.timing(topBottom, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
        }).reset();
        Animated.timing(opacity, {
          toValue: 1,
          useNativeDriver: true,
          duration: 800,
        }).reset();
      };
    }, [])
  );

  return (
    <Container backgroundColor={backgroundColor}>
      {appbar ? (
        <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
          <SafeAreaView></SafeAreaView>
          <BackBtn onPress={back ? nack : () => navigation.goBack()} />
          <Title text={title} />
        </View>
      ) : (
        <AppBar side={side} move={topBottom} title={title} action={action} back={back ? back : () => navigation.goBack()} />
      )}
      <Animated.View style={Platform.OS === "ios" ? { paddingHorizontal: 20, flex: 1, opacity } : { paddingHorizontal: 20, flex: 1 }}>{children}</Animated.View>
      <SafeAreaView></SafeAreaView>
    </Container>
  );
};

export default ScreenLayout;
