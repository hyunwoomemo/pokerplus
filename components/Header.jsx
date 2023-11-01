import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";

const Container = styled.View`
  flex-direction: row;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  /* padding: 10px; */
  margin: 10px;
`;

const Hambuger = styled.TouchableOpacity`
  width: 20%;
  flex-direction: row;
  padding: 20px 20px 20px 10px;
`;

const Main = styled.TouchableOpacity`
  width: 60%;
  flex-direction: row;
  justify-content: center;
`;

const QRWrapper = styled.View`
  flex-direction: row;
  width: 20%;
  justify-content: flex-end;
  gap: 20px;
  align-items: center;
  padding-right: 10px;
`;

const Header = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const queryClient = useQueryClient();
  return (
    <Container>
      <Hambuger
        onPress={() => {
          navigation.toggleDrawer();
          queryClient.invalidateQueries(["myticket"]);
          queryClient.invalidateQueries(["send"]);
          queryClient.invalidateQueries(["user"]);
          queryClient.invalidateQueries(["pushUnRead"]);
          // navigation.setParams({ route: router.name });
        }}
      >
        <Image source={{ uri: "https://data.spolive.com/data/template/t08/common/open-menu.png" }} width={20} height={20} />

        {/* <Octicons name="three-bars" size={24} color="black" /> */}
      </Hambuger>
      <Main onPress={() => navigation.navigate("Home")}>
        <Image source={{ uri: "https://data.spolive.com/data/template/t08/common/logo.png" }} width={40} height={40} resizeMode="contain" />
      </Main>
      <QRWrapper>
        <TouchableOpacity onPress={() => navigation.navigate("QrNav", { screen: "QrCreate" })}>
          <MaterialCommunityIcons name="qrcode-edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("QrNav", { screen: "QrScan" })}>
          <MaterialCommunityIcons name="qrcode-scan" size={24} color="black" />
        </TouchableOpacity>
      </QRWrapper>
    </Container>
  );
};

export default Header;
