import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const Container = styled.View`
  flex-direction: row;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Hambuger = styled.TouchableOpacity`
  width: 20%;
  flex-direction: row;
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
  gap: 10px;
  align-items: center;
`;

const Header = () => {
  const navigation = useNavigation();
  const router = useRoute();
  return (
    <Container>
      <Hambuger
        onPress={() => {
          navigation.toggleDrawer();
          // navigation.setParams({ route: router.name });
        }}
      >
        <Image source={{ uri: "https://newgenerationdatadev.blob.core.windows.net/data/template/t08/common/open-menu.png" }} width={20} height={20} />

        {/* <Octicons name="three-bars" size={24} color="black" /> */}
      </Hambuger>
      <Main onPress={() => navigation.navigate("Home")}>
        <Image source={{ uri: "https://newgenerationdatadev.blob.core.windows.net/data/template/t08/common/logo.png" }} width={40} height={40} resizeMode="cover" />
      </Main>
      <QRWrapper>
        <TouchableOpacity onPress={() => navigation.navigate("QrCreate")}>
          <MaterialCommunityIcons name="qrcode-edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("QrScan")}>
          <MaterialCommunityIcons name="qrcode-scan" size={24} color="black" />
        </TouchableOpacity>
      </QRWrapper>
    </Container>
  );
};

export default Header;
