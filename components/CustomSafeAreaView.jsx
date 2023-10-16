import React from "react";
import { SafeAreaView } from "react-native";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/auth/atom";

const CustomSafeAreaView = ({ children, style }) => {
  const [user, setUser] = useRecoilState(authState);

  return <SafeAreaView style={user ? { ...style, backgroundColor: "#ebf2f0" } : { ...style, backgroundColor: "#fff" }}>{children}</SafeAreaView>;
};

export default CustomSafeAreaView;
