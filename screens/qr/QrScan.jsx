import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AppBar from "../../components/AppBar";

const QrScan = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="QR Scan" />
    </View>
  );
};

export default QrScan;
