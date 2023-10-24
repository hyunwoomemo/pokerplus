import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { qrApi } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import AppBar from "../../components/AppBar";
import ScreenLayout from "../../components/ScreenLayout";

export default function QrScan({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setScanned(false);
      };
    }, [])
  );

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(type);
    setScanned(true);

    const hash = data.slice(data.lastIndexOf("/") + 1);

    const getInfo = async () => {
      try {
        const res = await qrApi.getInfo(hash);
        console.log(res);
        navigation.navigate("QrSend", { data: res.DATA });
      } catch (err) {
        toast.show("유효하지 않은 QR코드입니다.");
        console.log("유효하지 않은 QR코드입니다.");
        navigation.navigate("Home");
        // Alert.alert("에러", err);
      }
    };

    getInfo();
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.camera} />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <ScreenLayout title="참가권 QR스캔" back={() => navigation.navigate("Home")}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "white" }}>
        {renderCamera()}
        <View style={{ gap: 10, alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>참가권 전송 ∙ 대회 바이인</Text>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>QR 코드를 스캔해주세요!</Text>
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: "80%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 40,
    borderWidth: 6,
    borderColor: "#ff3183",
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
