import React from "react";
import { Text, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  /* max-height: 80%;
  margin: auto 0; */
  /* padding: 50px 0; */
`;

const LogoWrapper = styled.View`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
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
  background-color: rgba(255, 255, 255, 0.5);
  padding: 15px 20px;
  border-radius: 30px;
`;
const EmailInput = styled.TextInput``;
const PwInput = styled.TextInput``;

const FindWrapper = styled.View`
  margin-top: 30px;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
`;

const FindItem = styled.TouchableOpacity`
`

const FindItemText = styled.Text`
font-size: 12px;
`

const ButtonWrapper = styled.View`
  margin-top: 50px;
  width: 80%;
  gap: 15px;
`;

const ButtonItem = styled.TouchableOpacity`
  background-color: ${props => props.login ? 'hotpink' : 'black'};
  padding: 15px 20px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;

`

const ButtonItemText = styled.Text`
  font-weight: bold;
  color: #fff;
`


const Join = ({navigation}) => {
  const onLogin = () => {
    navigation.goBack()
  }

  const onJoin = () => {
    navigation.goBack()
  }

  return (
    <Container>
      <LogoWrapper>
        <Text>로고</Text>
      </LogoWrapper>
      <FormWrapper>
        <FormItemWrapper>
          <Text>아이콘</Text>
          <EmailInput placeholder="이메일 입력" placeholderTextColor="gray"></EmailInput>
        </FormItemWrapper>
        <FormItemWrapper>
          <Text>아이콘</Text>
          <PwInput placeholder="비밀번호 입력" placeholderTextColor="gray"></PwInput>
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
        <ButtonItem onPress={onLogin} login={true}><ButtonItemText>로그인</ButtonItemText></ButtonItem>
        <ButtonItem onPress={onJoin}><ButtonItemText>회원가입</ButtonItemText></ButtonItem>
      </ButtonWrapper>
    </Container>
  );
};

export default Join;
