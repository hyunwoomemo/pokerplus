import React from "react";
import { SafeAreaView } from "react-native";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/auth/atom";

const CustomSafeAreaView = ({ children, style }) => {
  const [user, setUser] = useRecoilState(authState);

  return <SafeAreaView style={user ? { ...style, backgroundColor: "#ecf2f0" } : { ...style, backgroundColor: "#ecf2f0" }}>{children}</SafeAreaView>;
};

export default CustomSafeAreaView;
