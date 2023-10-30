import React, { useEffect, useRef, useState } from "react";
import BackBtn from "../../components/BackBtn";
import Layout from "../../components/Layout";
import Input, { WithButtonLabelInput, WithLabelInput } from "../../components/Input";
import { Image, LayoutAnimation, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Button from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import { useImageUpload } from "../../utils/useImageUpload";
import { AntDesign } from "@expo/vector-icons";
import ScreenLayout from "../../components/ScreenLayout";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { measure } from "react-native-reanimated";
import { authApi } from "../../api";
import { useToast } from "react-native-toast-notifications";

const Alliance = ({ navigation: { navigate }, route }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [values, setValues] = useState({});
  const [measure, setMeasure] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef();
  const shopNameRef = useRef();
  const bizLicenseNoRef = useRef();
  const chiefNameRef = useRef();
  const chiefHpRef = useRef();
  const addressRef = useRef();

  const toast = useToast();

  useEffect(() => {
    const arr = [bizLicenseNoRef, chiefNameRef, chiefHpRef];

    arr.forEach((item) =>
      item.current?.measureLayout(scrollViewRef.current, (left, top, width, height) => {
        if (measure.length < 2) {
          setMeasure((prev) => [...prev, top - height]);
        }
      })
    );
  }, []);

  const scrollToPosition = (x = 0, y = 0) => {
    scrollViewRef?.current?.scrollTo({ x, y, animated: true });
  };

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const handleChangeText = (type, text) => {
    switch (type) {
      case "shop_name":
        setValues({
          ...values,
          shop_name: text,
        });
        break;
      case "biz_license_no":
        text = text
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, "$1-$2-$3")
          .replace(/(\-{1,2})$/g, "");
        console.log(text.length);
        setValues({
          ...values,
          biz_license_no: text,
        });
        if (text.length === 12) {
          chiefNameRef.current.focus();
        }
        break;
      case "chief_name":
        setValues({
          ...values,
          chief_name: text,
        });
        break;
      case "chief_hp":
        text = text
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
          .replace(/(\-{1,2})$/g, "");
        setValues({
          ...values,
          chief_hp: text,
        });
        break;
      case "detailAddress":
        setValues({
          ...values,
          detailAddress: text,
        });
        break;
      case "open_talk_link":
        setValues({
          ...values,
          open_talk_link: text,
        });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    if (imageUrl) {
      const uriParts = imageUrl.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append("file1", {
        uri: Platform.OS === "ios" ? imageUrl.replace("file://", "") : imageUrl,
        name: `file1.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    const { shop_name, biz_license_no, chief_name, chief_hp, address, open_talk_link } = values;

    const bodyData = {
      shop_name,
      biz_license_no,
      chief_name,
      chief_hp,
      address: values.detailAddress ? route.params.address + " " + values.detailAddress : route.parmas.address,
      zip_code: route.params.zipCode,
      open_talk_link: open_talk_link || null,
    };

    for (const key in bodyData) {
      if (bodyData[key] !== null) {
        formData.append(key, bodyData[key]);
      }
    }

    try {
      const res = await authApi.accountRegistShop(formData);
      if (res.CODE === "AS000") {
        toast.show("제휴 매장 신청이 완료되었습니다.");
        navigate("Home");
      } else {
        switch (res.CODE) {
          case "AS001":
            toast.show("데이터베이스 오류입니다.");
            break;
          case "AS002":
            toast.show("로그인 후 이용바랍니다.");
            break;
          case "AS003":
            toast.show("데이터베이스 오류입니다.");
            break;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitDisabled = !(values.shop_name && values.biz_license_no && values.chief_name && values.chief_hp && route.params?.address);

  return (
    <ScreenLayout title="제휴 매장 신청">
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ScrollView ref={scrollViewRef}>
          <WithLabelInput
            onSubmitEditing={() => {
              bizLicenseNoRef.current?.focus();
              scrollToPosition(0, measure[0]);
            }}
            value={values.shop_name}
            require
            onChangeText={(text) => handleChangeText("shop_name", text)}
          >
            <StyledText>매장명</StyledText>
          </WithLabelInput>
          <WithLabelInput
            onSubmitEditing={() => {
              chiefNameRef.current?.focus();
              scrollToPosition(0, measure[1]);
            }}
            ref={bizLicenseNoRef}
            maxLength={12}
            value={values.biz_license_no}
            require
            keyboardType="number-pad"
            placeholder="- 제외하고 입력하세요."
            placeholderTextColor="gray"
            onChangeText={(text) => handleChangeText("biz_license_no", text)}
          >
            <StyledText>사업자번호</StyledText>
          </WithLabelInput>
          <WithLabelInput
            onSubmitEditing={() => {
              chiefHpRef.current?.focus();
              scrollToPosition(0, measure[2]);
            }}
            ref={chiefNameRef}
            value={values.chief_name}
            require
            onChangeText={(text) => handleChangeText("chief_name", text)}
          >
            <StyledText>대표자명</StyledText>
          </WithLabelInput>
          <WithLabelInput
            ref={chiefHpRef}
            require
            placeholder="- 제외하고 입력하세요."
            placeholderTextColor="gray"
            keyboardType="number-pad"
            onChangeText={(text) => handleChangeText("chief_hp", text)}
            value={values.chief_hp}
            maxLength={13}
          >
            <StyledText>대표자 번호</StyledText>
          </WithLabelInput>
          <WithButtonLabelInput editable={false} require label="검색" onPress={() => navigate("SearchPostcode")} value={route.params?.address}>
            <StyledText>매장 주소</StyledText>
          </WithButtonLabelInput>
          <Input
            style={{ marginTop: 10 }}
            editable={route.params?.address ? true : false}
            onChangeText={(text) => handleChangeText("detailAddress", text)}
            placeholder="상세 주소 입력"
            placeholderTextColor="gray"
            value={values.detailAddress}
          />
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
          <WithLabelInput onChangeText={(text) => handleChangeText("open_talk_link", text)}>
            <StyledText>오픈톡 링크</StyledText>
          </WithLabelInput>
          {/* </ScrollView> */}
          <Button label="제휴 신청" loading={loading} disabled={submitDisabled} onPress={handleSubmit} primary style={{ marginVertical: 20 }} />
        </ScrollView>
      </KeyboardAwareScrollView>
    </ScreenLayout>
  );
};

const StyledText = styled.Text`
  font-size: 16px;
`;

export default Alliance;
