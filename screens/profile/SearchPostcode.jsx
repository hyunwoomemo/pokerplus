import React from "react";
import { Platform, Text, View } from "react-native";
import Postcode from "@actbase/react-daum-postcode";
import BackBtn from "../../components/BackBtn";

const SearchPostcode = ({ navigation, route }) => {
  const getAddressData = (data) => {
    console.log(data);
    let defaultAddress = ""; // 기본주소
    if (data.buildingName === "N") {
      defaultAddress = data.apartment;
    } else {
      defaultAddress = data.buildingName;
    }

    navigation.navigate("Alliance", {
      address: data.address,
      zipCode: data.zonecode,
    });
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      {Platform.OS === "Android" && <BackBtn />}
      <Postcode style={{ width: "100%", height: "100%" }} jsOptions={{ animation: true }} onSelected={(data) => getAddressData(data)} />
    </View>
  );
};

export default SearchPostcode;
