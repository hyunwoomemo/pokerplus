import React, { useEffect } from "react";
import { Alert } from "react-native";
import Root from "./navigator/Root";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecoilRoot } from "recoil";
import { Linking, Text, TextInput } from "react-native";
import { deepLinkConfig } from "./source";
import { ToastProvider } from "react-native-toast-notifications";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { preventAutoHideAsync } from "expo-splash-screen";
import { authApi, customerApi, resourceApi, ticketApi } from "./api";
import { offset, offsetValue } from "./config";
import { StatusBar } from "expo-status-bar";
import { OneSignal } from "react-native-onesignal";

SplashScreen.preventAutoHideAsync();

// 텍스트 적용
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

// Text Input 적용
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const queryClient = new QueryClient();
const Nav = createNativeStackNavigator();
export default function App() {
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
          // 인증 성공시 로직
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

  useEffect(() => {
    const prefetch = async () => {
      setTimeout(() => {
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
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <RecoilRoot>
          <ToastProvider duration={2000} offset={30} swipeEnabled={true}>
            {/* <StatusBar backgroundColor="#ecf2f0" /> */}
            <NavigationContainer linking={linking}>
              <Nav.Navigator>
                <Nav.Screen name="Root" component={Root} options={{ headerShown: false }} />
              </Nav.Navigator>
            </NavigationContainer>
          </ToastProvider>
        </RecoilRoot>
      </PaperProvider>
    </QueryClientProvider>
  );
}
