import React from "react";
import Header from "./Header";
import { View, SafeAreaView, StatusBar, Platform } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #e8f0ee;
`;

const Layout = ({ children, toggleDrawer }) => {
  return (
    <SafeAreaView style={Platform.OS === "android" ? { flex: 1, paddingTop: 15, backgroundColor: "#e8f0ee" } : { flex: 1, paddingTop: 0, backgroundColor: "#e8f0ee" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#e8f0ee" />
      <Container>
        <Header toggleDrawer={toggleDrawer} />
        {children}
      </Container>
    </SafeAreaView>
  );
};

export default Layout;
