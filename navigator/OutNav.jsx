import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Terms from "../screens/auth/Terms";
import Join from "../screens/join/Join";
import Login from "../screens/auth/Login";
import FindId from "../screens/auth/FindId";
import FindIdSuccess from "../screens/auth/FindIdSuccess";
import FindPwSuccess from "../screens/auth/FindPwSuccess";
import FindPw from "../screens/auth/FindPw";
// import SplashScreen from "react-native-splash-screen";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/auth/atom";
import { getStorage } from "../utils/asyncStorage";
import * as SplashScreen from "expo-splash-screen";

const Nav = createNativeStackNavigator();

const OutNav = () => {
  const [user, setUser] = useRecoilState(authState);

  useEffect(() => {
    getStorage("token").then((data) => {
      const hideSplash = async () => {
        await SplashScreen.hideAsync();
      };
      if (!data) {
        setTimeout(() => {
          hideSplash();
        }, 2000);
      }
    });
    // if (Object.keys(user).length === 0) {

    //   setTimeout(() => {
    //     SplashScreen.hide();
    //   }, 3000);
    // }
  }, []);
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Nav.Screen name="Login" component={Login} />
      <Nav.Screen name="Join" component={Join} />
      <Nav.Screen name="Terms" component={Terms} />
      <Nav.Screen name="FindId" component={FindId} />
      <Nav.Screen name="FindPw" component={FindPw} />
      <Nav.Screen name="FindIdSuccess" component={FindIdSuccess} />
      <Nav.Screen name="FindPwSuccess" component={FindPwSuccess} />
    </Nav.Navigator>
  );
};

export default OutNav;
