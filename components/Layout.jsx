import React from "react";
import Header from "./Header";
import { View, SafeAreaView, StatusBar, Platform } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #ecf2f0;
`;

const Layout = ({ children, toggleDrawer }) => {
  return (
    <SafeAreaView style={Platform.OS === "android" ? { flex: 1, paddingTop: 15, backgroundColor: "#ecf2f0" } : { flex: 1, paddingTop: 0, backgroundColor: "#ecf2f0" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#ecf2f0" />
      <Container>
        <Header toggleDrawer={toggleDrawer} />
        {children}
      </Container>
    </SafeAreaView>
  );
};

export default Layout;
