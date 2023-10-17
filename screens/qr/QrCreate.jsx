import React, { useEffect, useMemo, useRef, useState } from "react";
import { LayoutAnimation, Text, View } from "react-native";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { Fontisto } from "@expo/vector-icons";
import { qrApi } from "../../api";
import QRCode from "react-native-qrcode-svg";

const QrCreate = () => {
  const [qrInfoUrl, setQrInfoUrl] = useState("");
  const [timer, setTimer] = useState(10);

  const handleCount = () => {
    setTimer((prev) => {
      if (prev - 1 > 0) {
        return prev - 1;
      } else {
        return 0;
      }
    });
  };

  useEffect(() => {
    const countdown = setInterval(handleCount, 1000);

    return () => {
      clearInterval(handleCount, 1000);
    };
  }, []);

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

  useEffect(() => {
    getQrInfoUrl();
  }, []);

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
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 30 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 14 }}>유효시간</Text>
            <Text style={{ fontSize: 22, color: "#ff3183" }}>{formatTimer(timer)}</Text>
            <View style={{ marginLeft: 10, borderWidth: 1, padding: 3, borderRadius: 30, width: 30, height: 30, justifyContent: "center", alignItems: "center" }}>
              <Fontisto name="stopwatch" size={18} color="black" />
            </View>
          </View>
          <View style={{ backgroundColor: "#fff", padding: 40, borderRadius: 20 }}>
            <View>{qrInfoUrl && <QRCode value={qrInfoUrl} size={150} />}</View>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default QrCreate;
