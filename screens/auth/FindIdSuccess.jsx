import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { authApi } from "../../api";
import Button from "../../components/Button";
import ScreenLayout from "../../components/ScreenLayout";

const FindIdSuccess = ({ navigation: { navigate }, route }) => {
  const { authkey, user_id } = route.params;

  const [authInfo, setAuthInfo] = useState();

  console.log(authkey);
  console.log(authInfo);

  useEffect(() => {
    try {
      authApi.authInfo(authkey).then((res) => {
        console.log(res);
        if (res.CODE === "AAI000") {
          setAuthInfo(res.DATA);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, [authInfo]);

  return (
    <ScreenLayout title="이메일 찾기" appbar>
      {authInfo?.name && <Text style={{ marginTop: 30 }}>{`${authInfo?.name}님의 이메일은 아래와 같습니다.`}</Text>}
      {<Text style={{ marginTop: 30 }}>{`이메일은 아래와 같습니다.`}</Text>}
      <View
        style={{
          padding: 32,
          marginVertical: 20,
          alignItems: "center",
          backgroundColor: "#ecf2f0",
          borderRadius: 20,
          shadowColor: "gray",
          shadowOpacity: 0.5,
          shadowRadius: 7,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        }}
      >
        {user_id && <Text style={{ fontSize: 24 }}>{`${user_id}`}</Text>}
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
        <Button dark style={{ flex: 1 }} label="로그인" onPress={() => navigate("Login")} />
        <Button style={{ flex: 1 }} onPress={() => navigate("FindPw")} primary={true} label="비밀번호 찾기" />
      </View>
    </ScreenLayout>
  );
};

export default FindIdSuccess;
