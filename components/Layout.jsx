import React from "react";
import Header from "./Header";
import { View, SafeAreaView, StatusBar, Platform } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #ebf2f0;
`;

const Layout = ({ children, toggleDrawer }) => {
  StatusBar.setBackgroundColor("#ebf2f0");
  StatusBar.setBarStyle("dark-content");
  return (
    <SafeAreaView style={Platform.OS === "android" ? { flex: 1, backgroundColor: "#ebf2f0" } : { flex: 1, paddingTop: 0, backgroundColor: "#ebf2f0" }}>
      <StatusBar />
      <Container>
        <Header toggleDrawer={toggleDrawer} />
        {children}
      </Container>
    </SafeAreaView>
  );
};

export default Layout;
