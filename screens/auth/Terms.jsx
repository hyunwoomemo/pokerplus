import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import BackBtn from "../../components/BackBtn";
import styled from "styled-components/native";
import { Icon } from "../../source";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenLayout from "../../components/ScreenLayout";
import GradientBtn from "../../components/GradientBtn";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { authApi } from "../../api";

const TextWrapper = styled.View``;

const FirstLine = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 15px;
`;

const Bold = styled.Text`
  font-weight: 900;
  font-size: 24px;
`;

const Basic = styled.Text`
  font-size: 24px;
`;

const SecondLine = styled.View``;

const CheckWrapper = styled.View`
  padding: 50px 20px 50px 0;
  gap: 30px;
`;

const CheckRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;
const CheckText = styled.Text``;

const Circle = styled.TextInput`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 3px solid gray;
`;
const CheckCircle = styled.View``;

const Show = styled.TouchableOpacity`
  margin-left: auto;
`;
const ShowText = styled.Text``;

const Terms = () => {
  const navigation = useNavigation();
  const allRef = useRef(null);
  const provisionRef = useRef(null);
  const privacyRef = useRef(null);
  const positionRef = useRef(null);
  const privacyOptionRef = useRef(null);

  const terms = [
    {
      text: "약관 전체 동의",
      showBtn: null,
      ref: allRef,
      style: {
        color: "#ff3183",
        fontWeight: "900",
        fontSize: 18,
      },
    },
    {
      text: "서비스 이용 약관에 동의 (필수)",
      ref: provisionRef,
      showBtn: () =>
        navigation.navigate("OutNav", {
          screen: "TermsNav",
          type: "Provision",
          text: "서비스 이용 약관에 동의 (필수)",
        }),
    },
    {
      text: "개인정보 수집 및 이용에 동의 (필수)",
      ref: privacyRef,

      showBtn: () =>
        navigation.navigate("OutNav", {
          screen: "TermsNav",
          type: "Privacy",
          text: "개인정보 수집 및 이용에 동의 (필수)",
        }),
    },
    {
      text: "위치 정보 이용 약관에 동의 (필수)",
      ref: positionRef,
      showBtn: () =>
        navigation.navigate("OutNav", {
          screen: "TermsNav",
          type: "Position",
          text: "위치 정보 이용 약관에 동의 (필수)",
        }),
    },
    {
      text: "마켓팅 및 이용정보 수신 동의 (선택)",
      ref: privacyOptionRef,
      showBtn: () =>
        navigation.navigate("OutNav", {
          screen: "TermsNav",
          type: "Privacy_Option",
          text: "마켓팅 및 이용정보 수신 동의 (선택)",
        }),
    },
  ];

  const [check, setCheck] = useState([]);

  console.log(check);

  const handleCheck = (i) => {
    if (i === 0) {
      check.length !== 4 ? setCheck([1, 2, 3, 4]) : setCheck([]);
    } else {
      if (check.includes(i)) {
        setCheck((prev) => prev.filter((v) => v !== i));
      } else {
        setCheck((prev) => [...prev, i].filter((v, i, arr) => arr.indexOf(v) === i));
      }
    }
  };

  const handleCheckAuth = async () => {
    console.log("본인인증 페이지 이동");
    try {
      Linking.openURL(`https://ngapi.dev.pokerzone.io/auth/create?next=pokerplusapp://join?check=${check.sort((a, b) => a - b).join(",")}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScreenLayout>
      <BackBtn />
      <TextWrapper>
        <FirstLine>
          <Bold>서비스 이용 약관</Bold>
          <Basic>에</Basic>
        </FirstLine>
        <SecondLine>
          <Basic>동의해주세요.</Basic>
        </SecondLine>
      </TextWrapper>
      <CheckWrapper>
        {terms.map((term, i) => {
          return (
            <CheckRow key={term.text}>
              <BouncyCheckbox ref={term.ref} fillColor="#ff3183" isChecked={i === 0 ? check.length === 4 : check.includes(i)} onPress={() => handleCheck(i)} />
              <TouchableOpacity onPress={() => term.ref?.current.onPress()}>
                <CheckText style={term.style && { ...term.style }}>{term.text}</CheckText>
              </TouchableOpacity>
              {term.showBtn && (
                <Show onPress={term.showBtn}>
                  <ShowText>보기</ShowText>
                </Show>
              )}
            </CheckRow>
          );
        })}
      </CheckWrapper>
      <GradientBtn onPress={handleCheckAuth} disabled={check.filter((v) => v !== 4).length !== 3} label="휴대폰 본인 인증" style={{ marginTop: "auto" }} />
    </ScreenLayout>
  );
};

export default Terms;
