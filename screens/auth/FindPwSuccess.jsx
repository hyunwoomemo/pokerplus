import React, { useRef, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import ScreenLayout from "../../components/ScreenLayout";
import styled from "styled-components/native";
import { WithLabelErrorInput } from "../../components/Input";
import { validateJoin } from "../../utils/validate";
import Button from "../../components/Button";
import { authApi } from "../../api";
import { useToast } from "react-native-toast-notifications";

const Container = styled.View`
  padding: 20px;
  background-color: #fff;
  flex: 1;
`;

const FindPwSuccess = ({ route, navigation: { navigate } }) => {
  const [values, setValues] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { authkey, user_id } = route.params;

  const pwRef = useRef();
  const pw2Ref = useRef();

  const handleChangeText = (type, text) => {
    setValues({ ...values, [type]: text });
    validateJoin(type, text, values, error, setError);
  };
  const toast = useToast();

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const res = await authApi.passwordChange(user_id, authkey, values.password);

      if (res.CODE === "APC000") {
        toast.show("비밀번호가 변경되었습니다.");
        navigate("Login");
      } else {
        toast.show("비밀번호 변경에 실패했습니다.");
        setValues({});
        setError({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const disabled = values.password?.length > 0 && values.password2?.length > 0 && !error.password && !error.password2;

  return (
    <ScreenLayout title="새 비밀번호 입력" appbar>
      <Text style={{ marginTop: 30, fontSize: 16 }}>앱 내에서 사용하실 새로운 비밀번호를 입력해 주세요.</Text>
      <View style={{ marginTop: 20 }}>
        <WithLabelErrorInput
          onChangeText={(text) => handleChangeText("password", text)}
          placeholder="8자 이상 영문, 숫자, 특수문자 혼합 사용 가능"
          placeholderTextColor="gray"
          secureTextEntry
          error={error.password}
          ref={pwRef}
          onSubmitEditing={() => {
            pw2Ref.current.focus();
          }}
        >
          <Text style={{ fontSize: 16 }}>새 비밀번호</Text>
        </WithLabelErrorInput>
        <WithLabelErrorInput
          onChangeText={(text) => handleChangeText("password2", text)}
          placeholder="한번 더 입력해주세요."
          secureTextEntry
          error={error.password2}
          placeholderTextColor="gray"
          ref={pw2Ref}
          onSubmitEditing={() => {
            handleChangePassword();
          }}
        >
          <Text style={{ fontSize: 16 }}>새 비밀번호 확인</Text>
        </WithLabelErrorInput>
      </View>
      <View style={{ flexDirection: "row", marginTop: "auto", gap: 10 }}>
        <Button label="취소" onPress={() => navigate("Login")} style={{ flex: 1, color: "#000" }} />
        <Button onPress={handleChangePassword} primary label="변경 완료" style={{ flex: 1 }} loading={loading} disabled={!disabled} />
      </View>
    </ScreenLayout>
  );
};

export default FindPwSuccess;
