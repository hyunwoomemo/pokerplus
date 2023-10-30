import React from "react";
import { Image, Linking, SafeAreaView, TouchableOpacity } from "react-native";
import { Icon } from "../../source";
import ScreenLayout from "../../components/ScreenLayout";

const FindPw = () => {
  const handleCheckAuth = async () => {
    try {
      Linking.openURL(`https://ngapi.dev.pokerzone.io/auth/create?next=pokerplusapp://findpwsuccess?`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScreenLayout title="비밀번호 찾기">
      <TouchableOpacity onPress={handleCheckAuth} style={{ paddingTop: 50, alignItems: "center" }}>
        <Image source={{ uri: Icon.checkPhone }} width={140} height={140} />
      </TouchableOpacity>
    </ScreenLayout>
  );
};

export default FindPw;
