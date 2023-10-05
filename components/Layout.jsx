import React from "react";
import Header from "./Header";
import { View, SafeAreaView } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #ebf2f0;
  /* margin-top: 40px; */
`;

const Layout = ({ children, toggleDrawer }) => {
  return (
      <Container>
        <Header toggleDrawer={toggleDrawer} />
        {children}
      </Container>
  );
};

export default Layout;
