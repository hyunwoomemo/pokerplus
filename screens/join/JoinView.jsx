import React, { useRef } from "react";
import { Join } from "./Join";
import { StyleSheet, Text } from "react-native";
import BackBtn from "../../components/BackBtn";
import Title from "../../components/Title";
import { global, globalStyle } from "../../globalStyle";
import { Icon } from "../../source";

const JoinView = ({ navigation, route }) => {
  // const { authkey, user_id, check } = route.params;
  // console.log('join view', authkey, user_id, check)

  const styles = StyleSheet.create({
    profile: {
      alignItems: "center",
      marginTop: 20,
    },
    noti: {
      marginTop: 20,
      color: global.pink,
    },
    label: {
      marginTop: 20,
      flexDirection: "row",
    },
    inputWrapper: {
      justifyContent: "space-around",
      flexDirection: "row",
      alignContent: "center",
      gap: 10,
    },
    input: {
      backgroundColor: "#edf0f7",
      flex: 5,
      borderRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 20,
      paddingLeft: 20,
    },
    check: {
      flex: 2,
      backgroundColor: "#383838",
      borderRadius: 40,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    engLabel: {
      marginVertical: 5,
    },
    buttonWrapper: {
      marginVertical: 30,
      flexDirection: "row",
      gap: 10,
    },
  });

  // ref
  const emailRef = useRef();
  const pwRef = useRef();
  const pw2Ref = useRef();
  const engFirstRef = useRef();
  const engLastRef = useRef();
  const nickRef = useRef();
  const locationRef = useRef();

  return (
    <Join style={styles.main} refArr={[emailRef, pwRef, pw2Ref, engFirstRef, engLastRef, nickRef, locationRef]}>
      {/* header */}
      <BackBtn />
      <Title text="회원가입" />
      <Join.Profile style={styles.profile} uri={Icon.profile} width={120} height={120} borderRadius={60} resizeMode="contain" />
      <Join.Noti style={styles.noti}>원활한 회원가입을 위해 필수 입력 칸(*)을 입력해주세요.</Join.Noti>
      {/* input */}
      <Join.InputWrapper gap={10} style={styles.inputWrapper}>
        <Join.Label target={emailRef} name="이메일" required style={styles.label} fontSize={16} />
        <Join.Input name="email" ref={emailRef} style={styles.input} />
        <Join.EmailCheck style={styles.check} text="중복 확인" />
      </Join.InputWrapper>
      <Join.InputWrapper gap={10} style={styles.inputWrapper}>
        <Join.Label target={pwRef} name="비밀번호" required style={styles.label} fontSize={16} />
        <Join.Input name="password" ref={pwRef} style={styles.input} placeholder="8자 이상 영문, 숫자, 특수문자 혼합 사용" />
      </Join.InputWrapper>
      <Join.InputWrapper gap={10} style={styles.inputWrapper}>
        <Join.Label target={pw2Ref} name="비밀번호 확인" required style={styles.label} fontSize={16} />
        <Join.Input name="password2" ref={pw2Ref} style={styles.input} placeholder="비밀번호를 한번 더 입력해주세요." />
      </Join.InputWrapper>
      <Join.InputWrapper gap={10} style={styles.inputWrapper}>
        <Join.Label name="이름" style={styles.label} fontSize={16} />
        <Join.Input style={styles.input} disabled />
      </Join.InputWrapper>
      <Join.InputWrapper gap={10} style={styles.inputWrapper}>
        <Join.Label name="영문 이름" style={styles.label} fontSize={16} />
        <Join.EngFirst name="engFirst" ref={engFirstRef} placeholder="GilDong" labelStyle={styles.engLabel} inputStyle={styles.input} />
        <Join.EngLast name="engLast" ref={engLastRef} placeholder="Hong" labelStyle={styles.engLabel} inputStyle={styles.input} />
      </Join.InputWrapper>
      <Join.InputWrapper gap={10} style={styles.inputWrapper}>
        <Join.Label target={nickRef} name="닉네임" required style={styles.label} fontSize={16} />
        <Join.Input name="nick" ref={nickRef} style={styles.input} />
        <Join.NickCheck style={styles.check} text="중복 확인" />
      </Join.InputWrapper>
      <Join.InputWrapper gap={10} style={styles.inputWrapper}>
        <Join.Label name="휴대폰번호" style={styles.label} fontSize={16} />
        <Join.Input style={styles.input} disabled />
      </Join.InputWrapper>
      <Join.InputWrapper gap={10} style={styles.inputWrapper}>
        <Join.Label name="생년월일" style={styles.label} fontSize={16} />
        <Join.Input style={styles.input} disabled />
      </Join.InputWrapper>
      <Join.InputWrapper gap={10} style={styles.inputWrapper}>
        <Join.Label target={locationRef} name="지역(시/도)" required style={styles.label} fontSize={16} />
        <Join.Input name="location" ref={locationRef} style={styles.input} />
      </Join.InputWrapper>
      <Join.ButtonWrapper style={styles.buttonWrapper}>
        <Join.Cancel />
        <Join.Submit />
      </Join.ButtonWrapper>
    </Join>
  );
};

export default JoinView;
