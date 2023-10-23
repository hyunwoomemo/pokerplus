import React, { useState } from "react";
import BackBtn from "../components/BackBtn";
import Layout from "../components/Layout";
import Input, { WithButtonLabelInput, WithLabelInput } from "../components/Input";
import { Image, LayoutAnimation, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import { useImageUpload } from "../utils/useImageUpload";
import { AntDesign } from "@expo/vector-icons";
import ScreenLayout from "../components/ScreenLayout";

const Alliance = ({ navigation: { navigate }, route }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [filename, setFilename] = useState("");

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  return (
    <ScreenLayout title="제휴 매장 신청">
      <ScrollView>
        <WithLabelInput require>
          <Text>매장명</Text>
        </WithLabelInput>
        <WithLabelInput require placeholder="- 제외하고 입력하세요." placeholderTextColor="gray">
          <Text>사업자번호</Text>
        </WithLabelInput>
        <WithLabelInput require>
          <Text>대표자명</Text>
        </WithLabelInput>
        <WithLabelInput require placeholder="- 제외하고 입력하세요." placeholderTextColor="gray">
          <Text>대표자 번호</Text>
        </WithLabelInput>
        <WithButtonLabelInput require label="검색" onPress={() => navigate("SearchPostcode")} value={route.params?.address}>
          <Text>매장 주소</Text>
        </WithButtonLabelInput>
        <Input style={{ marginTop: 10 }} placeholder="상세 주소 입력" placeholderTextColor="gray" />
        <WithButtonLabelInput value={filename ? filename : ""} label="파일 첨부" onPress={() => useImageUpload(status, requestPermission, setImageUrl, setFilename)}>
          <Text>사업자등록증</Text>
        </WithButtonLabelInput>
        {imageUrl && (
          <View style={{ flexDirection: "row", marginVertical: 20, gap: 10 }}>
            <Image style={{ borderRadius: 20 }} source={{ uri: imageUrl }} width={100} height={120} resizeMode="stretch" />
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                setImageUrl("");
                setFilename("");
              }}
            >
              <AntDesign name="closecircle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        <WithLabelInput>
          <Text>오픈톡 링크</Text>
        </WithLabelInput>
      </ScrollView>
      <Button label="제휴 신청" primary style={{ marginTop: 20 }} />
    </ScreenLayout>
  );
};

export default Alliance;
