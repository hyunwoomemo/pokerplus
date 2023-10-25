import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import Tabs from "./Tab";
import { MyDrawer } from "./Drawer";
import Profile from "../screens/Profile";
import InNav from "./InNav";
import OutNav from "./OutNav";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/auth/atom";
import { getStorage } from "../utils/asyncStorage";
// import SplashScreen from "react-native-splash-screen";
import { authApi, customerApi, resourceApi, ticketApi } from "../api";
import { PosterContext } from "../context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { offsetValue } from "../config";

const Nav = createNativeStackNavigator();

const Root = () => {
  const [user, setUser] = useRecoilState(authState);
  const [poster, setPoster] = useState([]);
  const queryClient = useQueryClient();

  const values = {
    poster,
    setPoster,
  };

  useEffect(() => {
    const prefetch = async () => {
      setTimeout(() => {
        console.log("dsfsdf");
        SplashScreen.hideAsync();
      }, 2000);

      queryClient.prefetchQuery(["poster"], resourceApi.posters);
      queryClient.prefetchQuery(["notice", 1], () => customerApi.noticeList({ board_id: "notice", offset: offsetValue, page: 1 }));
      queryClient.prefetchQuery(["myticket"], ticketApi.list);
      queryClient.prefetchQuery(["qna", 1], () => customerApi.customerList(0, offsetValue, 1));
      queryClient.prefetchQuery(["user"], authApi.info);
    };

    prefetch();
  }, []);

  return (
    <PosterContext.Provider value={values}>
      <Nav.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {Object.keys(user).length > 0 ? <Nav.Screen name="InNav" component={InNav} /> : <Nav.Screen name="OutNav" component={OutNav} />}
      </Nav.Navigator>
    </PosterContext.Provider>
  );
};

export default Root;
