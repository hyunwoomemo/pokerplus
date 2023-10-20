import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import axios from "axios";
import { qrApi } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Barcode Scanner App!</Text>
      <Text style={styles.paragraph}>Scan a barcode to start your job.</Text>
      {renderCamera()}
      <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
        <Text style={styles.buttonText}>Scan QR to Start your job</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
