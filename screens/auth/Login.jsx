import React, { useEffect, useRef, useState } from "react";
import { Text, Image } from "react-native";
import styled from "styled-components/native";
import { Icon } from "../../source";
import InputField from "../../components/InputField";
import { authApi } from "../../api";
import { useRecoilState } from "recoil";
import { authState } from "../../recoil/auth/atom";
import { validateLogin } from "../../utils/validate";
import { useToast } from "react-native-toast-notifications";
import Button from "../../components/Button";
import { getStorage, setStorage } from "../../utils/asyncStorage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
  flex: 1;
`;

const LogoWrapper = styled.View`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const FormWrapper = styled.View`
  width: 80%;
  gap: 15px;
  margin-top: 30px;
`;
const FormItemWrapper = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 15px 20px;
  border-radius: 15px;
`;

const FindWrapper = styled.View`
  margin-top: 30px;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
`;

const FindItem = styled.TouchableOpacity``;

const FindItemText = styled.Text`
  font-size: 14px;
`;

const ButtonWrapper = styled.View`
  margin-top: 50px;
  width: 80%;
  gap: 15px;
`;

const Login = ({ navigation: { navigate } }) => {
  const passwordRef = useRef(null);
  const toast = useToast();

  const onJoin = () => {
    navigate("TermsNav");
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(authState);

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

  useEffect(() => {
    getStorage("user").then((data) => {
      if (data) {
        setUser(JSON.parse(data));
      }
    });
  }, []);

  const onLogin = async () => {
    setLoading(true);
    try {
      const bodyData = {
        id: values.email,
        password: values.password,
      };

      const res = await authApi.login(bodyData);
      if (res?.CODE === "AL000") {
        setStorage("token", res.DATA.TOKEN);
        const accountInfo = await authApi.info();
        setStorage("user", JSON.stringify(accountInfo?.DATA));
        setUser(accountInfo?.DATA);
      } else {
        switch (res?.CODE) {
          case "AL001":
            toast.show("로그인에 실패했습니다.");
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
      <KeyboardAwareScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "#fff" }}>
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
              onChangeText={(text) => handleChangeText("email", text)}
              error={error.email}
              touched={touched.email}
              inputMode="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              blurOnSubmit={false}
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
          <Button onPress={onJoin} dark label="회원가입" />
        </ButtonWrapper>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Login;
