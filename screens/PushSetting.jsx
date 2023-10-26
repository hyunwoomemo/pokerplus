import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Switch, Text, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import AppBar from "../components/AppBar";
import { OneSignal } from "react-native-onesignal";
import { useFocusEffect } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { pushState } from "../recoil/push/atom";
import { getStorage, setStorage } from "../utils/asyncStorage";

const PushSetting = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const getPush = async () => {
      const res = await getStorage("isPushEnabled");
      console.log("push", res);
      setIsEnabled(res);
    };

    getPush();
  }, []);

  const toggleSwitch = () => {
    if (!isEnabled) {
      OneSignal.User.pushSubscription.optIn();
      setStorage("isPushEnabled", true);
    } else {
      OneSignal.User.pushSubscription.optOut();
      setStorage("isPushEnabled", false);
    }
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <ScreenLayout title={"푸시 알림 설정"}>
      {pushState.loading ? (
        <ActivityIndicator size={"large"} color={"#ff3183"} style={StyleSheet.absoluteFillObject} />
      ) : (
        <View style={{ gap: 30 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: 18 }}>푸시 알림</Text>
            <Switch trackColor={{ false: "#fff", true: "rgb(52,190,87)" }} thumbColor={isEnabled ? "#fff" : "#ecf2f0"} ios_backgroundColor="#ecf2f0" onValueChange={toggleSwitch} value={isEnabled} />
          </View>
          {/* <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: 18 }}>야간 푸시 알림</Text>
            <Switch
              trackColor={{ false: "#ecf2f0", true: "rgb(52,190,87)" }}
              thumbColor={isNightEnabled ? "#fff" : "#ecf2f0"}
              ios_backgroundColor="#ecf2f0"
              onValueChange={toggleNightSwitch}
              value={isNightEnabled}
            />
          </View> */}
        </View>
      )}
    </ScreenLayout>
  );
};

export default PushSetting;
