import React, { useRef, useState } from "react";
import { Alert, Image, ScrollView, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import InputField from "../components/InputField";
import JoinInputField from "../components/JoinInputField";
import { validateJoin } from "../utils/validate";

const Container = styled.ScrollView`
  /* flex: 1; */
  padding: 20px 0;
  gap: 40px;
`;

const Profile = styled.TouchableOpacity`
  margin-top: 20px;
  align-items: center;
`;

const Noti = styled.Text`
  color: #ff3183;
  font-size: 14px;
  margin-top: 20px;
  padding: 10px;
`;

// const FormWrapper = styled.ScrollView`
// padding: 10px;
// `

const Join = ({ route, navigation }) => {

  const passwordRef = useRef();

  const [values, setValues] = useState({
    email: "",
    password: "",
    password2: "",
    eng_name: "",
    nick: "",
    location_code: null,
    file1: null,
    provision_yn: "Y",
    privacy_yn: "Y",
    position_yn: "Y",
  });

  // const [touched, setTouched] = useState({});

  const [error, setError] = useState({});

  const handleChangeText = (name, text) => {
    setValues({
      ...values,
      [name]: text,
    });
    validateJoin(name, text, values, error, setError);
  };

  return (
    <Container>
      <Profile>
        <Image
          source={{
            uri: "https://www.pokerplus.co.kr/_next/image?url=%09https%3A%2F%2Fnewgenerationdatadev.blob.core.windows.net%2Fdata%2Ftemplate%2Ft08%2Faccount%2Fprofile_default_img.jpg&w=256&q=75",
          }}
          width={100}
          height={100}
          style={{ borderRadius: 50 }}
          resizeMode="contain"
        />
      </Profile>
      <Noti>* 원활한 회원가입을 위해 필수 입력 칸(*)을 입력해주세요.</Noti>
      <JoinInputField
        check={true}
        label="이메일"
        value={values.email}
        onChangeText={(text) => handleChangeText("email", text)}
        error={error.email}
        inputMode="email"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      {/* <Text>이메일</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput style={{backgroundColor: 'tomato'}} maxLength={4}/>
        <TouchableOpacity style={{backgroundColor: 'gray'}}><Text>중복 확인</Text></TouchableOpacity>
        </View> */}
      <Text>비밀번호</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput ref={passwordRef} style={{ backgroundColor: "tomato" }} />
      </View>

      <Text>비밀번호 확인</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput style={{ backgroundColor: "tomato" }} />
      </View>

      <Text>이름</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>이현우</Text>
      </View>

      <Text>영문 이름(GPI 등재할 영문 이름)</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput style={{ backgroundColor: "tomato" }} />
      </View>

      <Text>닉네임</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput style={{ backgroundColor: "tomato" }} />
        <TouchableOpacity style={{ backgroundColor: "gray" }}>
          <Text>중복 확인</Text>
        </TouchableOpacity>
      </View>

      <Text>휴대폰번호</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>010-7736-1324</Text>
      </View>

      <Text>생년월일</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>1994-07-15</Text>
      </View>

      <Text>지역(시/도)</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput style={{ backgroundColor: "tomato" }} />
      </View>
    </Container>
  );
};

export default Join;
