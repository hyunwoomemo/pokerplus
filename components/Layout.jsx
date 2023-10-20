import React from "react";
import Header from "./Header";
import { View, SafeAreaView, StatusBar, Platform } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Layout = ({ children, toggleDrawer }) => {
  return (
    <SafeAreaView style={Platform.OS === "android" ? { flex: 1, paddingTop: 15, backgroundColor: "#fff" } : { flex: 1, paddingTop: 0, backgroundColor: "#fff" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#fff" />
      <Container>
        <Header toggleDrawer={toggleDrawer} />
        {children}
      </Container>
    </SafeAreaView>
  );
};

export default Layout;
