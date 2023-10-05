import React, { useEffect, useRef, useState } from "react";
import { Text, Image, LayoutAnimation, Alert } from "react-native";
import styled from "styled-components/native";
// import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "../../source";
import InputField from "../../components/InputField";
import { authApi } from "../../api";
import GradientBtn from "../../components/GradientBtn";
import { useMutation, useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState } from 'recoil';
import { authState } from '../../recoil/account/atom';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  /* max-height: 80%;
  margin: auto 0; */
  /* padding: 50px 0; */
`;

const LogoWrapper = styled.View`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(255, 255, 255, 0.5); */
  margin-bottom: 20px;
`;
const FormWrapper = styled.View`
  width: 80%;
  gap: 15px;
  margin-top: 30px;
  /* flex: 1 1 auto; */
`;
const FormItemWrapper = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  border: 1px solid gray;
  background-color: rgba(238, 240, 236, 1);
  padding: 15px 20px;
  border-radius: 10px;
`;

const FindWrapper = styled.View`
  margin-top: 30px;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
`;

const FindItem = styled.TouchableOpacity``;

const FindItemText = styled.Text`
  font-size: 12px;
`;

const ButtonWrapper = styled.View`
  margin-top: 50px;
  width: 80%;
  gap: 15px;
`;

const ButtonItem = styled.TouchableOpacity`
  background-color: ${(props) => (props.login ? undefined : "black")};
  padding: 18px 20px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const ButtonItemText = styled.Text`
  font-weight: bold;
  color: #fff;
`;

const Login = ({ navigation: { navigate } }) => {
  const passwordRef = useRef(null);
  // const emailRef = useRef(null);

  // useEffect(() => {
  //   emailRef.current?.focus()
  // }, [])

  const onJoin = () => {
    navigate("Terms");
  };

  const validateLogin = (name, text) => {
    if (name === "email") {
      const regEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      console.log(regEmail.test(text));
      if (!regEmail.test(text)) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setError({ ...error, email: "올바른 이메일 형식이 아닙니다." });
      } else {
        setError({ ...error, email: "" });
      }
    } else {
      const pattern1 = /[0-9]/;
      const pattern2 = /[a-z]/;
      const pattern3 = /[A-Z]/;
      //const pattern4 = /[~!@\#$%<>^&*]/;     // 원하는 특수문자 추가 제거
      const pattern4 = /[^0-9a-zA-Z]/; //이외 문자

      if (!pattern1.test(text) || (!pattern2.test(text) && !pattern3.test(text)) || !pattern4.test(text) || text.length < 8 || text.length > 50) {
        // 8자 이상 영문, 숫자, 특수문자 혼합 사용하여 입력바랍니다.
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setError({ ...error, password: "8자 이상 영문, 숫자, 특수문자 혼합 사용하여 입력바랍니다." });
      } else {
        setError({ ...error, password: "" });
      }

      let samePass_0 = 0; //동일문자 카운트
      let samePass_1 = 0; //연속성(+) 카운드
      let samePass_2 = 0; //연속성(-) 카운드

      for (let i = 0; i < text.length; i++) {
        let chr_pass_0;
        let chr_pass_1;
        let chr_pass_2;

        if (i >= 2) {
          chr_pass_0 = text.charCodeAt(i - 2);
          chr_pass_1 = text.charCodeAt(i - 1);
          chr_pass_2 = text.charCodeAt(i);

          // 동일문자 카운트
          if (chr_pass_0 == chr_pass_1 && chr_pass_1 == chr_pass_2) {
            samePass_0++;
          } else {
            samePass_0 = 0;
          }

          //연속성(+) 카운드
          if (chr_pass_0 - chr_pass_1 == 1 && chr_pass_1 - chr_pass_2 == 1) {
            samePass_1++;
          } else {
            samePass_1 = 0;
          }

          //연속성(-) 카운드
          if (chr_pass_0 - chr_pass_1 == -1 && chr_pass_1 - chr_pass_2 == -1) {
            samePass_2++;
          } else {
            samePass_2 = 0;
          }
        }

        if (samePass_0 > 0) {
          setError({ ...error, password: "동일문자를 3자 이상 연속 입력할 수 없습니다." }); //동일문자를 3자 이상 연속 입력할 수 없습니다.
        }

        if (samePass_1 > 0 || samePass_2 > 0) {
          setError({ ...error, password: "영문, 숫자는 3자 이상 연속 입력할 수 없습니다." }); //영문, 숫자는 3자 이상 연속 입력할 수 없습니다.
        }
      }
    }
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});

  const handleChangeText = (name, text) => {
    setValues({
      ...values,
      [name]: text,
    });
    validateLogin(name, text);
  };

  const handleBlur = (name) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const { data, mutate, isLoading, isError, error: mutateError, isSuccess } = useMutation(authApi.login);

  const onLogin = () => {
    const { email, password } = values;
    // const [auth, setAuth] = useRecoilState(authState)
    // console.log(auth)
    mutate(
      { id: email, password: password },
      {
        onSuccess: async (data) => {
          console.log("login", data);
          if (data.CODE === "AL000") {
            await AsyncStorage.setItem('token', data.DATA.TOKEN)
            navigate("Drawer");
          } else {
            Alert.alert("로그인 실패");
          }
        },
      }
      // {
      //   onSuccess: async (data) => {
      //     if (data.CODE === "AL000") {
      //       Alert.alert("로그인 성공");
      //       console.log('login', data )
      //       navigate('Drawer')
      //     } else {
      //       Alert.alert("로그인 실패");
      //     }
      //   },
      // }
    );
    // console.log("login", data);
  };

  return (
    <Container>
      <LogoWrapper>
        <Image source={{ uri: Icon.logo }} width={100} height={100} resizeMode="contain"></Image>
      </LogoWrapper>
      <FormWrapper>
        <FormItemWrapper>
          <Image source={{ uri: Icon.user }} width={18} height={18} resizeMode="contain" />
          <InputField
            placeholder="이메일 입력"
            placeholderTextColor="gray"
            value={values.email}
            onBlur={() => handleBlur("email")}
            onChangeText={(text) => handleChangeText("email", text)}
            error={error.email}
            touched={touched.email}
            inputMode="email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
        </FormItemWrapper>
        <FormItemWrapper>
          <Image source={{ uri: Icon.password }} width={18} height={18} resizeMode="contain" />
          <InputField
            placeholder="비밀번호 입력"
            placeholderTextColor="gray"
            value={values.password}
            onBlur={() => handleBlur("password")}
            error={error.password}
            onChangeText={(text) => handleChangeText("password", text)}
            touched={touched.password}
            secureTextEntry
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={onLogin}
          />
        </FormItemWrapper>
      </FormWrapper>
      <FindWrapper>
        <FindItem>
          <FindItemText>이메일 찾기</FindItemText>
        </FindItem>
        <Text>|</Text>
        <FindItem>
          <FindItemText>비밀번호 찾기</FindItemText>
        </FindItem>
      </FindWrapper>
      <ButtonWrapper>
        <GradientBtn onPress={onLogin} label="로그인" />
        <ButtonItem onPress={onJoin}>
          <ButtonItemText>회원가입</ButtonItemText>
        </ButtonItem>
      </ButtonWrapper>
    </Container>
  );
};

export default Login;
