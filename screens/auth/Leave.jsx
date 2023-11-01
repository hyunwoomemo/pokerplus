import React, { useCallback, useEffect, useState } from "react";
import ScreenLayout from "../../components/ScreenLayout";
import styled from "styled-components/native";
import { Linking, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { WithLabelInput } from "../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../components/Button";
import { authApi } from "../../api";

const Leave = ({ route }) => {
  useEffect(() => {
    const handleLeave = async () => {
      if (route.params) {
        const { authkey } = route.params;

        const res = await authApi.accountLeave({ authKey: authkey, memo: "" });
      }
    };

    handleLeave();
  }, [route]);
  const [values, setValues] = useState({});

  const handleCheck = () => {
    // setChecked(!checked);
    setValues({
      ...values,
      check: !values.check,
    });
  };

  const handleChangeText = (text) => {
    setValues({
      ...values,
      password: text,
    });
  };

  const handleSubmit = async () => {
    try {
      Linking.openURL(`https://www.pokerplus.co.kr/auth/create?next=pokerplusapp://leave`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScreenLayout title={"회원탈퇴"} appbar backgroundColor="#fff">
      <KeyboardAwareScrollView>
        <Container>
          <TextContainer>
            <HeaderText>※ 회원탈퇴 주의사항 안내</HeaderText>
            <MainText>회원 탈퇴 후 3개월 동안 회원가입이 불가능합니다.</MainText>
            <MainText>탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가합니다.</MainText>
            <CheckText>탈퇴 신청 즉시, 소지하고 계시던 참가권, 다이아의 데이터는 모두 삭제 됩니다.</CheckText>
          </TextContainer>
          <AgreeWrapper>
            <BouncyCheckbox onPress={() => handleCheck()} fillColor="#ff3183" />
            <StyleText>약관 전체 동의</StyleText>
          </AgreeWrapper>
          {/* <PasswordWrapper>
            <WithLabelInput secureTextEntry backgroundColor={"#ecf2f0"} onChangeText={(text) => handleChangeText(text)}>
              <StyleText>비밀번호 입력</StyleText>
            </WithLabelInput>
          </PasswordWrapper> */}
          <Button label={"탈퇴하기"} style={{ marginTop: 50 }} onPress={handleSubmit} dark disabled={!values.check} />
        </Container>
      </KeyboardAwareScrollView>
    </ScreenLayout>
  );
};

const Container = styled.View``;
const TextContainer = styled.View`
  gap: 10px;
  padding: 20px;
  border: 2px solid black;
  margin: 20px 0;
  border-radius: 20px;
`;
const StyleText = styled.Text`
  font-size: 16px;
`;
const HeaderText = styled(StyleText)`
  font-weight: bold;
  margin-bottom: 10px;
`;
const MainText = styled(StyleText)``;
const CheckText = styled(StyleText)`
  color: #ff3183;
  font-weight: bold;
`;
const AgreeWrapper = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const PasswordWrapper = styled.View`
  padding: 20px 0;
`;

export default Leave;
