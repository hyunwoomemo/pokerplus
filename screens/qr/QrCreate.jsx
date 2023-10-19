import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { Fontisto } from "@expo/vector-icons";
import { qrApi } from "../../api";
import QRCode from "react-native-qrcode-svg";
import { useFocusEffect } from "@react-navigation/native";

const QrCreate = () => {
  const [qrInfoUrl, setQrInfoUrl] = useState("");
  const [timer, setTimer] = useState(180);

  useFocusEffect(
    useCallback(() => {
      getQrInfoUrl();
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            setTimer(180);
            getQrInfoUrl();
            return 0;
          }
        });
      }, 1000);

      return () => {
        setTimer(180);
        clearInterval(interval);
      };
    }, [])
  );

  const getQrInfoUrl = async () => {
    try {
      const { CODE, URL } = await qrApi.getUrl();
      // console.log('api.qr.getUrl() res DATA: ', CODE, URL)
      const success = CODE === "QU000";
      if (success) {
        setQrInfoUrl(URL);
        console.log(CODE, URL);
      }
    } catch (err) {
      console.log("error in src/app/qr/create/page getQrInfoUrl: ", err);
    }
  };

  const formatTimer = (timer) => {
    const first = Math.floor(timer / 60);
    const second = timer - 60 * first;
    const ssecond = String(second).padStart(2, "0");

    return `${first}:${ssecond}`;
  };

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 25 }}>
          <LinearGradient colors={["#bc20a7", "#4c56fa"]} start={{ x: 0.3, y: 0.1 }} style={{ borderRadius: 30, width: "80%" }} end={{ x: 0.9, y: 0.1 }}>
            <View style={{ borderRadius: 30, backgroundColor: "#ebf2f0", marginVertical: 2, marginHorizontal: 2, paddingVertical: 5, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>PCT QR CODE</Text>
            </View>
          </LinearGradient>
        </View>
        {qrInfoUrl ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 40 }}>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 14 }}>유효시간</Text>
              <Text style={{ fontSize: 22, color: "#ff3183" }}>{formatTimer(timer)}</Text>
              <TouchableOpacity
                onPress={() => setTimer(180)}
                style={{ marginLeft: 10, borderWidth: 1, padding: 3, borderRadius: 30, width: 30, height: 30, justifyContent: "center", alignItems: "center" }}
              >
                <Fontisto name="stopwatch" size={18} color="black" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                padding: 40,
                borderRadius: 30,
                shadowColor: "#000",
                shadowOffset: {
                  width: 2,
                  height: 3,
                },
              }}
            >
              <View>
                <QRCode value={qrInfoUrl} size={150} />
              </View>
            </View>

            <View style={{ paddingVertical: 10, paddingHorizontal: 15, borderWidth: 1, borderColor: "rgba(0,0,0,0.2)", borderRadius: 10 }}>
              <Text>Download QR</Text>
            </View>
          </View>
        ) : (
          <ActivityIndicator style={{ ...StyleSheet.absoluteFillObject, flex: 1 }} size={"large"} color="#ff3183" />
        )}
      </View>
    </Layout>
  );
};

export default QrCreate;
