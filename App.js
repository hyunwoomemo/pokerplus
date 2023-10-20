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
import "react-native-reanimated";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { PaperProvider } from "react-native-paper";

// SplashScreen.preventAutoHideAsync();

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

  useEffect(() => {
    // Remove this method to stop OneSignal Debugging
    OneSignal?.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal?.initialize("ae232b11-fde8-419d-8069-9ec35bf73f62");

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal?.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal?.Notifications.addEventListener("click", (event) => {
      console.log("OneSignal: notification clicked:", event);
    });
  }, []);

  return (
    <PaperProvider>
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
    </PaperProvider>
  );
}
