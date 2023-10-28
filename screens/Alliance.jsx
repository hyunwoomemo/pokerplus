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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Alliance = ({ navigation: { navigate }, route }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [filename, setFilename] = useState("");

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const handleChangeText = (type, text) => {};

  return (
    <ScreenLayout title="제휴 매장 신청">
      <KeyboardAwareScrollView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WithLabelInput require onChangeText={(text) => handleChangeText("shop_name", text)}>
            <StyledText>매장명</StyledText>
          </WithLabelInput>
          <WithLabelInput require placeholder="- 제외하고 입력하세요." placeholderTextColor="gray">
            <StyledText>사업자번호</StyledText>
          </WithLabelInput>
          <WithLabelInput require>
            <StyledText>대표자명</StyledText>
          </WithLabelInput>
          <WithLabelInput require placeholder="- 제외하고 입력하세요." placeholderTextColor="gray">
            <StyledText>대표자 번호</StyledText>
          </WithLabelInput>
          <WithButtonLabelInput require label="검색" onPress={() => navigate("SearchPostcode")} value={route.params?.address}>
            <StyledText>매장 주소</StyledText>
          </WithButtonLabelInput>
          <Input style={{ marginTop: 10 }} placeholder="상세 주소 입력" placeholderTextColor="gray" />
          <WithButtonLabelInput buttonWidth={1.5} value={filename ? filename : ""} label="파일 첨부" onPress={() => useImageUpload(status, requestPermission, setImageUrl, setFilename)}>
            <StyledText>사업자등록증</StyledText>
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
            <StyledText>오픈톡 링크</StyledText>
          </WithLabelInput>
        </ScrollView>
        <Button label="제휴 신청" primary style={{ marginVertical: 20 }} />
      </KeyboardAwareScrollView>
    </ScreenLayout>
  );
};

const StyledText = styled.Text`
  font-size: 16px;
`;

export default Alliance;
