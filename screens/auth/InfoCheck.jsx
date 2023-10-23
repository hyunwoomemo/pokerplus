import React, { useState } from "react";
import { Text, View } from "react-native";
import Layout from "../../components/Layout";
import BackBtn from "../../components/BackBtn";
import { WithLabelInput } from "../../components/Input";
import Button from "../../components/Button";
import { authApi } from "../../api";
import ScreenLayout from "../../components/ScreenLayout";

const InfoCheck = ({ navigation: { navigate, goBack }, route }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (text) => {
    setPassword(text);
  };

  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await authApi.passwordCheck(password);
      if (res.CODE === "APC000") {
        navigate("InfoEdit");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  return (
    <ScreenLayout title="정보 수정">
      <View>
        <WithLabelInput secureTextEntry onChangeText={(text) => handleChange(text)} onSubmitEditing={handleCheck} value={password}>
          <Text>비밀번호 확인</Text>
        </WithLabelInput>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 30 }}>
          <Button dark label="취소" style={{ flex: 1 }} onPress={() => goBack()} />
          <Button label="확인" loading={loading} onPress={handleCheck} primary style={{ flex: 1 }} />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default InfoCheck;
