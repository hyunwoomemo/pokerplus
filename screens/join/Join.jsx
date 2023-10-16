import React, { useEffect, useRef, useState } from "react";
import { Text, Image, LayoutAnimation, Alert, View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Icon } from "../../source";
import { DisabledInput, WithEngInput, WithLabelCheckErrorInput, WithLabelCheckInput, WithLabelDisableInput, WithLabelErrorInput, WithLabelInput } from "../../components/Input";
import BackBtn from "../../components/BackBtn";
import Title from "../../components/Title";
import { authApi } from "../../api";
import * as ImagePicker from "expo-image-picker";
// import { ImagePicker } from "react-native-image-picker";
import { useImageUpload } from "../../utils/useImageUpload";
import { SelectList } from "react-native-dropdown-select-list";
import Button from "../../components/Button";
import { useValidate } from "./hooks/useValidate";

const Profile = styled.Image`
  padding: 20px 0;
`;

const Noti = styled.Text`
  color: #ff3183;
  font-size: 14px;
`;

const styles = StyleSheet.create({
  main: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
});

const Join = ({ navigation: { navigate }, route }) => {
  // const [authkey, setAuthkey]
  console.log(route.params);
  const { authkey, check, user_id } = route.params;
  const [authInfo, setAuthInfo] = useState();

  useEffect(() => {
    if (!authInfo) {
      authApi.authInfo(authkey).then((res) => {
        setAuthInfo(res.DATA);
      });
    }
  }, []);

  const [values, setValues] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState({});
  const [success, setSuccess] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [selected, setSelected] = useState("");
  const [measure, setMeasure] = useState([]);
  const [area, setArea] = useState([]);

  const data = [];

  const scrollViewRef = useRef();
  const idRef = useRef();
  const pwRef = useRef();
  const pw2Ref = useRef();
  const engFirstRef = useRef();
  const engLastRef = useRef();
  const nickRef = useRef();

  useEffect(() => {
    return () => {
      setImageUrl("");
    };
  }, []);

  const handleChangeText = (type, text) => {
    setValues({
      ...values,
      [type]: text,
    });

    useValidate(type, text, values, error, setError);

    setSuccess({ ...success, [type]: false });
  };

  // scrollTo
  useEffect(() => {
    const arr = [pwRef, pw2Ref, engFirstRef, engLastRef, nickRef];

    arr.forEach((item) =>
      item.current?.measureLayout(scrollViewRef.current, (left, top, width, height) => {
        if (measure.length < 4) {
          setMeasure((prev) => [...prev, top - height]);
        }
      })
    );
  }, []);
  // 지역
  useEffect(() => {
    if (area.length === 0) {
      authApi.accountCode("LC").then((res) => {
        res.DATA.forEach((item) => {
          setArea((prev) => [...prev, { key: item.code, value: item.title }]);
        });
      });
    }
  }, []);

  const handleCheck = async (type) => {
    setLoading({ ...loading, [type]: true });
    try {
      const res = await authApi.validate(type, { value: values[type] });

      // console.log(pwRef.current, pwRef.current.measure(y));
      if (res.CODE === "AC000") {
        setSuccess({ ...success, [type]: true });

        switch (type) {
          case "id":
            pwRef.current.focus();
            scrollToPosition(0, measure[0]);
            break;
          case "nick":
        }
      } else {
        switch (type) {
          case "id":
            pwRef.current.focus();
            scrollToPosition(0, measure[0]);
            break;
          case "nick":
            nickRef.current.focus();
        }
      }
    } catch (err) {
    } finally {
      setLoading({ ...loading, [type]: false });
    }
  };

  const scrollToPosition = (x = 0, y = 0) => {
    scrollViewRef.current.scrollTo({ x, y, animated: true });
  };

  const handleJoin = async () => {
    try {
      const file = imageUrl.split("/").pop();
      const match = /\.(\w+)$/.exec(file ?? "");
      const type = match ? `image/${match[1]}` : `image`;
      const formData = new FormData();
      formData.append("image", { uri: imageUrl, name: file, type });
      console.log(formData);
      const bodyData = {
        authkey: authkey,
        id: values.id,
        file1: formData,
        password: values.password,
        eng_name: values.engFirst + values.engLast,
        nick: values.nick,
        location_code: selected,
        provision_yn: "Y",
        privacy_yn: "Y",
        position_yn: "Y",
        privacy_option_yn: check.length === 4 ? "Y" : "N",
      };

      const res = await authApi.join(bodyData);
      console.log(bodyData);

      if (res.CODE === "AR000") {
        Alert.alert("회원가입이 완료되었습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.main}>
      <BackBtn />
      <Title text="회원가입" />
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={{ alignItems: "center", paddingVertical: 20 }} onPress={() => useImageUpload(status, requestPermission, setImageUrl)}>
          <Profile source={{ uri: imageUrl ? imageUrl : Icon.profile }} width={110} height={110} borderRadius={55} resizeMode="cover" />
        </TouchableOpacity>
        <Noti>원활한 회원가입을 위해 필수 입력 칸(*)을 입력해주세요.</Noti>
        <WithLabelCheckErrorInput
          onChangeText={(text) => handleChangeText("id", text)}
          error={error.id}
          onCheck={() => handleCheck("id")}
          loading={loading.id}
          success={success.id}
          ref={idRef}
          onSubmitEditing={() => {
            handleCheck("id");
          }}
        >
          <Text>이메일</Text>
          <Text style={{ color: "#ff3183" }}> (필수)</Text>
        </WithLabelCheckErrorInput>
        <WithLabelErrorInput
          onChangeText={(text) => handleChangeText("password", text)}
          error={error.password}
          secureTextEntry
          ref={pwRef}
          onSubmitEditing={() => {
            pw2Ref.current?.focus();
            scrollToPosition(0, measure[1]);
          }}
        >
          <Text>비밀번호</Text>
          <Text style={{ color: "#ff3183" }}> (필수)</Text>
        </WithLabelErrorInput>
        <WithLabelErrorInput
          onChangeText={(text) => handleChangeText("password2", text)}
          error={error.password2}
          secureTextEntry
          ref={pw2Ref}
          onSubmitEditing={() => {
            engFirstRef.current?.focus();
            scrollToPosition(0, measure[2]);
          }}
        >
          <Text>비밀번호 확인</Text>
          <Text style={{ color: "#ff3183" }}> (필수)</Text>
        </WithLabelErrorInput>
        <WithLabelInput value={authInfo?.name} editable={false} selectTextOnFocus={false} disableStyle>
          <Text>이름</Text>
        </WithLabelInput>
        <WithEngInput
          onChangeFirst={(text) => handleChangeText("engFirst", text)}
          onChangeLast={(text) => handleChangeText("engLast", text)}
          error={error.engFirst}
          refFirst={engFirstRef}
          refLast={engLastRef}
          submitFirst={() => {
            engLastRef.current.focus();
          }}
          submitLast={() => {
            nickRef.current.focus();
            scrollToPosition(0, measure[4]);
          }}
        >
          <Text>영문</Text>
        </WithEngInput>
        <WithLabelCheckErrorInput
          onChangeText={(text) => handleChangeText("nick", text)}
          error={error.nick}
          onCheck={() => handleCheck("nick")}
          loading={loading.nick}
          success={success.nick}
          ref={nickRef}
          onSubmitEditing={() => {
            handleCheck("nick");
          }}
        >
          <Text>닉네임</Text>
          <Text style={{ color: "#ff3183" }}> (필수)</Text>
        </WithLabelCheckErrorInput>
        <WithLabelInput value={authInfo?.hp} editable={false} selectTextOnFocus={false} disableStyle>
          <Text>휴대폰번호</Text>
        </WithLabelInput>
        <WithLabelInput value={authInfo?.socialno} editable={false} selectTextOnFocus={false} disableStyle>
          <Text>생년월일</Text>
        </WithLabelInput>
        <Text style={{ marginTop: 30 }}>지역(시/도)</Text>
        {area.length > 0 && (
          <SelectList
            boxStyles={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 15, paddingVertical: 18, paddingHorizontal: 20, borderColor: "transparent" }}
            dropdownStyles={{ backgroundColor: "#fff", borderWidth: 0 }}
            dropdownItemStyles={{ paddingVertical: 10 }}
            setSelected={(val) => setSelected(val)}
            data={area}
            save="key"
            defaultOption={{ key: "LC000", value: "전국" }}
          />
        )}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 30 }}>
          <Button label="취소" style={{ flex: 1 }} />
          <Button label="가입하기" onPress={handleJoin} primary={true} style={{ flex: 1 }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Join;
