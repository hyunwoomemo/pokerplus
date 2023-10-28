import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import Tabs from "./Tab";
import { MyDrawer } from "./Drawer";
import Profile from "../screens/Profile";
import InNav from "./InNav";
import OutNav from "./OutNav";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/auth/atom";
import { getStorage, removeStorage } from "../utils/asyncStorage";
// import SplashScreen from "react-native-splash-screen";
import { authApi, customerApi, resourceApi, ticketApi } from "../api";
import { PosterContext } from "../context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";
import { AntDesign } from "@expo/vector-icons";

const Nav = createNativeStackNavigator();

const Root = ({ navigation, route }) => {
  const [user, setUser] = useRecoilState(authState);
  const [poster, setPoster] = useState([]);
  const queryClient = useQueryClient();

  const values = {
    poster,
    setPoster,
  };

  const toast = useToast();

  const { data: userData, isLoading: userLoading, isError: userError, status } = useQuery(["user"], authApi.info);

  useEffect(() => {
    let count = 0;
    if (user && Object.keys(user).length && userError && route.name !== "Login") {
      count++;
      if (count === 1) {
        // setVisible(true);
        toast.show("로그인이 만료되었습니다.", {
          type: "normal",
          normalColor: "gray",
          icon: <AntDesign name="warning" size={20} color="white" />,
          style: { gap: 5 },
        });
        removeStorage("user");
        removeStorage("token");
        setUser({});
      }
    }
  }, [userError]);

  return (
    <PosterContext.Provider value={values}>
      <Nav.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user && Object.keys(user).length > 0 ? <Nav.Screen name="InNav" component={InNav} /> : <Nav.Screen name="OutNav" component={OutNav} />}
      </Nav.Navigator>
    </PosterContext.Provider>
  );
};

export default Root;
