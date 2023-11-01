// App.tsx

import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";
import { qrApi } from "../../api";
import { useToast } from "react-native-toast-notifications";
import { ActivityIndicator } from "react-native-paper";
import ScreenLayout from "../../components/ScreenLayout";

export default function QrScan({ navigation }) {
  const toast = useToast();
  useFocusEffect(
    useCallback(() => {
      setScanned(false);

      return () => {
        setScanned(true);
      };
    }, [])
  );
  const [scanned, setScanned] = useState(false);
  const [permission, setPermission] = useState({
    isGranted: false,
    isChecked: false,
  });

  const { width, height } = Dimensions.get("window");
  const [cameraLayout, setCameraLayout] = useState({});
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [qrWidth, setQrWidth] = useState(0);
  const [qrHeight, setQrHeight] = useState(0);

  useEffect(() => {
    Camera.getCameraPermissionsAsync().then(({ status }) => {
      setPermission({
        isGranted: status === "granted",
        isChecked: true,
      });
    });
  }, []);
  useEffect(() => {
    if (permission.isChecked && !permission.isGranted) {
      Camera.requestCameraPermissionsAsync().then(({ status }) => {
        setPermission({
          isGranted: status === "granted",
          isChecked: true,
        });
      });
    }
  }, [permission]);
  return (
    <View style={styles.container}>
      {permission.isGranted && !scanned && (
        <ScreenLayout>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>참가권 전송 • 대회 바이인</Text>
          </View>
          <Camera
            onLayout={(event) => setCameraLayout({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height })}
            type={CameraType.back}
            ratio={"16:9"}
            style={styles.camera}
            onBarCodeScanned={async (scannerResult) => {
              if (!scanned) {
                setScanned(true);
                const first = scannerResult.data.slice(scannerResult.data.indexOf("?url=") + 5);
                const hash = first.slice(first.lastIndexOf("/") + 1);
                try {
                  const res = await qrApi.getInfo(hash);
                  navigation.navigate("QrSend", { data: res.DATA });
                } catch (err) {
                  toast.show("유효하지 않은 QR코드입니다.");
                  console.log("유효하지 않은 QR코드입니다.");
                  navigation.navigate("Home");
                }
              }
            }}
          />
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 16 }}>QR 코드를 스캔해주세요</Text>
          </View>
        </ScreenLayout>
      )}
      {scanned && <ActivityIndicator style={StyleSheet.absoluteFillObject} size={"large"} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf2f0",
  },
  camera: {
    flex: 5,
  },
});
