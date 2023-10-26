import React from "react";
import styled from "styled-components/native";
import BackBtn from "./BackBtn";
import { SafeAreaView, ScrollView, View } from "react-native";
import Title from "./Title";
import AppBar from "./AppBar";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  background-color: #ecf2f0;
  flex: 1;
`;
const ScreenLayout = ({ back, children, title, appbar }) => {
  const navigation = useNavigation();

  return (
    <Container>
      {appbar ? (
        <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
          <SafeAreaView></SafeAreaView>
          <BackBtn onPress={back ? nack : () => navigation.goBack()} />
          <Title text={title} />
        </View>
      ) : (
        <AppBar title={title} back={back ? back : () => navigation.goBack()} />
      )}
      <View style={{ paddingHorizontal: 20, flex: 1 }}>{children}</View>
      <SafeAreaView></SafeAreaView>
    </Container>
  );
};

export default ScreenLayout;
