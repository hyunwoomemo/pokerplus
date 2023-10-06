// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { SafeAreaView, Platform, StatusBar, Alert } from "react-native";
import Root from "./navigator/Root";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecoilRoot } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import { getSearchParamFromURL } from "./utils/getSearchParamFromUrl";
import { deepLinkConfig } from "./source";

const queryClient = new QueryClient();

const Nav = createNativeStackNavigator();
export default function App() {
  const [ready, setReady] = useState(true);
  const [isLogin, setIsLogin] = useState();
  const [user, setUser] = useState();

  const getUser = async () => {
    const data = await AsyncStorage.getItem("token");
    const userData = await AsyncStorage.getItem("user");
    setReady(false);
    setIsLogin(data);
    setUser(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  const linking = {
    prefixes: ["https://...", "http://localhost:3000", "pokerplusapp://"],

    async getInitialURL() {
      const url = await Linking.getInitialURL();

      if (url != null) {
        return url;
      }

      return null;
    },

    subscribe(listener) {
      console.log("linking subscribe to ", listener);
      const onReceiveURL = (event) => {
        const { url } = event;
        if (url.includes("authkey")) {
          Alert.alert("인증 성공");
        }
        console.log("link has url", url, event);

        return listener(url);
      };

      Linking.addEventListener("url", onReceiveURL);

      return () => {
        console.log("linking unsubscribe to ", listener);
        Linking.removeAllListeners("url", onReceiveURL);
      };
    },
    config: deepLinkConfig,
  };

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="dark-content" backgroundColor="#ebf2f0" />
        <SafeAreaView style={Platform.OS === "android" ? { flex: 1, backgroundColor: "#ebf2f0" } : { flex: 1, paddingTop: 0, backgroundColor: "#ebf2f0" }}>
          {!ready && (
            <NavigationContainer linking={linking}>
              <Nav.Navigator>
                <Nav.Screen name="Root" component={Root} options={{ headerShown: false }} />
              </Nav.Navigator>
            </NavigationContainer>
          )}
        </SafeAreaView>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
