import React, { useRef, useState } from "react";
import { Text, Image, LayoutAnimation, Alert } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "../../source";
import GradientBtn from "../../components/GradientBtn";
import InputField from "../../components/InputField";
import { authApi } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState } from "../../recoil/auth/atom";
import { useMutation } from "@tanstack/react-query";
import { validateLogin } from "../../utils/validate";

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

const JoinTest = ({ navigation: { navigate } }) => {
  const passwordRef = useRef(null);

  const onJoin = () => {
    navigate("Terms");
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});

  const handleChangeText = (name, text) => {
    console.log(text);
    setValues({
      ...values,
      [name]: text,
    });
    validateLogin(name, text, error, setError);
  };

  const handleBlur = (name) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const { data, mutate, isLoading, isError, error: mutateError, isSuccess } = useMutation(authApi.login);
  const [auth, setAuth] = useRecoilState(authState);

  const onLogin = () => {
    mutate(
      { id: values.email, password: values.password },
      {
        onSuccess: async (data) => {
          console.log(data);
          if (data.CODE === "AL000") {
            Alert.alert("로그인 성공");
            const accountInfo = await axios
              .get("https://www.pokerplus.co.kr/account/info", {
                headers: {
                  Authorization: `Bearer ${data.DATA.TOKEN}`,
                  Cookie: `auth._token.pokerzone=${data.DATA.TOKEN}`,
                },
              })
              .then((res) => res.data);
            console.log("accpunt", accountInfo);
            await AsyncStorage.setItem("token", data.DATA.TOKEN);
            await AsyncStorage.setItem("user", JSON.stringify(accountInfo.DATA));
            setAuth(accountInfo.DATA);
            // console.log(accountInfo)
            // navigate('InNav')
          } else {
            Alert.alert("로그인 실패");
          }
        },
      }
    );
  };
  console.log(data, mutate, isLoading, isError, mutateError, isSuccess);

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
            // onBlur={() => handleBlur("email")}
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

export default JoinTest;
