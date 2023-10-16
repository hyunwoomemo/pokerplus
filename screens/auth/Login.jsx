import React, { useEffect, useRef, useState } from "react";
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
import { useToast } from "react-native-toast-notifications";
import { getToast } from "../../utils/getToast";
import Button from "../../components/Button";

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
  background-color: ${(props) => (props.login ? undefined : "#383838")};
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
  const toast = useToast();

  const onJoin = () => {
    navigate("Terms");
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChangeText = (name, text) => {
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

  // const { data, mutate, isLoading, isError, error: mutateError, isSuccess } = useMutation(authApi.login);
  const [auth, setAuth] = useRecoilState(authState);

  const onLogin = async () => {
    setLoading(true);
    try {
      const bodyData = {
        id: values.email,
        password: values.password,
      };

      const res = await authApi.login(bodyData);
      console.log("res", res);
      if (res.CODE === "AL000") {
        // Alert.alert("로그인 성공");
        await AsyncStorage.setItem("token", res.DATA.TOKEN);
        const accountInfo = await authApi.info();
        await AsyncStorage.setItem("user", JSON.stringify(accountInfo?.DATA));
        console.log(accountInfo);
        setAuth(accountInfo?.DATA);
      } else {
        switch (res.CODE) {
          case "AL001":
            toast.show("로그인에 실패했습니다.");
            // getToast(toast, "로그인에 실패했습니다.");
            break;
          case "AL002":
            toast.show("이메일 또는 비밀번호를 확인해주세요.");
            break;
          case "AL003":
            toast.show("로그인이 차단된 계정입니다.");
            break;
          case "AL300":
            toast.show("error", "탈퇴 계정입니다.");
            break;
          case "AL200":
            toast.show("error", "휴면 계정입니다.");
            break;
          case "REAUTH":
            toast.show("인증에 실패했습니다. 재인증 바랍니다.");
            break;
          case "REQUIRECHGPW":
            toast.show("패스워드 변경 후 로그인 바랍니다.");
            break;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            // error={error.password}
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
        <FindItem onPress={() => navigate("FindId")}>
          <FindItemText>이메일 찾기</FindItemText>
        </FindItem>
        <Text>|</Text>
        <FindItem onPress={() => navigate("FindPw")}>
          <FindItemText>비밀번호 찾기</FindItemText>
        </FindItem>
      </FindWrapper>
      <ButtonWrapper>
        <Button primary onPress={onLogin} loading={loading} label="로그인" />
        <ButtonItem onPress={onJoin}>
          <ButtonItemText>회원가입</ButtonItemText>
        </ButtonItem>
      </ButtonWrapper>
    </Container>
  );
};

export default Login;
