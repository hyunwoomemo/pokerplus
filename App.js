// import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Platform, StatusBar, Alert, View, Image, Text, StyleSheet } from "react-native";
import Root from "./navigator/Root";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecoilRoot } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import { deepLinkConfig } from "./source";
import { ToastProvider } from "react-native-toast-notifications";
import * as SplashScreen from "expo-splash-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

SplashScreen.preventAutoHideAsync();

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
      <ToastProvider duration={1000} offset={30} swipeEnabled={true}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <NavigationContainer linking={linking}>
          <Nav.Navigator>
            <Nav.Screen name="Root" component={Root} options={{ headerShown: false }} />
          </Nav.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </RecoilRoot>
  );
}
