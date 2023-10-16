import React, { useEffect, useState } from "react";
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Layout from "../../components/Layout";
import BackBtn from "../../components/BackBtn";
import Input, { WithLabelCheckErrorInput, WithLabelDisableInput, WithLabelErrorInput, WithLabelInput } from "../../components/Input";
import Button from "../../components/Button";
import { SelectList } from "react-native-dropdown-select-list";
import { authApi } from "../../api";
import * as ImagePicker from "expo-image-picker";
import { useImageUpload } from "../../utils/useImageUpload";
import { validateJoin } from "../../utils/validate";
import { useValidate } from "../join/hooks/useValidate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage, setStorage } from "../../utils/asyncStorage";
import { useRecoilState } from "recoil";
import { authState } from "../../recoil/auth/atom";

const InfoEdit = ({ route, navigation }) => {
  const [auth, setAuth] = useRecoilState(authState);

  const { name, eng_name, user_profile_url, email, nick, hp, location_code } = auth;

  const [selected, setSelected] = useState("");
  const [area, setArea] = useState([]);
  const [defaultValue, setDefaultValue] = useState({
    id: email,
    nick,
    location_code,
  });
  const [imageUrl, setImageUrl] = useState("");

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const [changneValues, setChangeValues] = useState({
    ...defaultValue,
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState({});

  const handleChange = (type, text) => {
    setChangeValues({
      ...changneValues,
      [type]: text,
    });
    if (type === "id" && text !== defaultValue.id) {
      setSuccess({
        ...success,
        [type]: false,
      });
    } else if (type === "nick" && text !== defaultValue.nick) {
      setSuccess({
        ...success,
        [type]: false,
      });
    }
    useValidate(type, text, changneValues, error, setError);
  };

  const handleCheck = async (type) => {
    setLoading({ ...loading, [type]: true });
    try {
      const res = await authApi.validate(type, { value: changneValues[type] });
      console.log(res);
      if (res.CODE === "AC000") {
        setSuccess({ ...success, [type]: true });
      }
    } catch (err) {
    } finally {
      setLoading({ ...loading, [type]: false });
    }
  };

  // 체크 여부 확인 로직 필요

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

  useEffect(() => {
    setChangeValues({
      ...changneValues,
      location_code: selected,
    });
  }, [selected]);

  useEffect(() => {
    return () => {
      setImageUrl("");
    };
  }, []);

  // 저장버튼 active 조건
  /*
    1. imageUrl이 ""이 아니다
    2. changeValues에 email이 있으면서  defaultValue.email과 changeValues.email이 같지 않다.
    3. changeValues에 nick이 있으면서 defaultValue.nick과 changeValues.nick이 같지 않다.
    4. changeValues.location_code가 빈칸이 아니면서 default와 change가 같지 않다.
    5. changeValues.password가 빈칸이 아니면서 change password === password2가 같다.
*/
  const saveActive =
    imageUrl ||
    (changneValues.id && defaultValue.id !== changneValues.id) ||
    (changneValues.nick && defaultValue.nick !== changneValues.nick) ||
    (changneValues.location_code && defaultValue.location_code !== changneValues.location_code) ||
    (changneValues.password && changneValues.password === changneValues.password2);

  const handleSave = async () => {
    const formData = new FormData();
    if (imageUrl) {
      const uriParts = imageUrl.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append("file1", {
        uri: Platform.OS === "ios" ? imageUrl.replace("file://", "") : imageUrl,
        name: `file1.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    const bodyData = {
      id: changneValues.id === defaultValue.id ? null : changneValues.id,
      nick: changneValues.nick === defaultValue.nick ? null : changneValues.nick,
      location_code: changneValues.location_code === defaultValue.location_code ? null : changneValues.location_code,
      password: changneValues.password ? changneValues.password : null,
      password1: changneValues.password2 ? changneValues.password2 : null,
    };
    setLoading({
      ...loading,
      save: true,
    });
    for (const key in bodyData) {
      if (bodyData[key] !== null) {
        formData.append(key, bodyData[key]);
      }
    }

    try {
      const res = await authApi.accountEdit(formData);
      if (res.CODE === "AUI000") {
        const accountInfo = await authApi.info();
        await setStorage("user", JSON.stringify(accountInfo?.DATA));
        setAuth(accountInfo?.DATA);
        navigation.navigate("Profile");
      }
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading({
        ...loading,
        save: false,
      });
    }
  };

  return (
    <Layout>
      <BackBtn title="정보 수정" />
      <ScrollView style={{ paddingHorizontal: 32 }}>
        <TouchableOpacity onPress={() => useImageUpload(status, requestPermission, setImageUrl)} style={{ alignItems: "center", paddingVertical: 30 }}>
          <Image source={{ uri: imageUrl ? imageUrl : user_profile_url }} width={120} height={120} borderRadius={60} resizeMode="cover" />
        </TouchableOpacity>
        <Button onPress={() => navigation.navigate("Alliance")} dark label=" 제휴 등록 " style={{ alignItems: "center" }} />
        <WithLabelDisableInput backgroundColor={"#fff"} value={name}>
          <Text>이름</Text>
        </WithLabelDisableInput>
        <WithLabelErrorInput backgroundColor={"#fff"} defaultValue={eng_name}>
          <Text>영문 이름 (GPI등재용)</Text>
        </WithLabelErrorInput>
        <WithLabelCheckErrorInput
          backgroundColor={"#fff"}
          defaultValue={email}
          onChangeText={(text) => handleChange("id", text)}
          disabled={email === changneValues.id}
          dark={true}
          error={error.id}
          onCheck={() => handleCheck("id")}
          success={success.id}
          loading={loading.id}
        >
          <Text>이메일</Text>
        </WithLabelCheckErrorInput>
        <WithLabelCheckErrorInput
          backgroundColor={"#fff"}
          defaultValue={nick}
          onChangeText={(text) => handleChange("nick", text)}
          disabled={nick === changneValues.nick}
          dark={nick !== changneValues.nick}
          error={error.nick}
          onCheck={() => handleCheck("nick")}
          success={success.nick}
          loading={loading.nick}
        >
          <Text>닉네임</Text>
        </WithLabelCheckErrorInput>
        <WithLabelDisableInput backgroundColor={"#fff"} value={hp}>
          <Text>연락처</Text>
        </WithLabelDisableInput>
        <Text style={{ marginTop: 30 }}>지역(시/도) {area.filter((v) => v.key === location_code)[0]?.value}</Text>
        {area.length > 0 && (
          <SelectList
            boxStyles={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 30, paddingVertical: 18, paddingHorizontal: 20, borderColor: "transparent" }}
            setSelected={(val) => setSelected(val)}
            data={area}
            save="key"
            // defaultOption={{ key: String(location_code), value: area.filter((v) => v.key === location_code)[0]?.value }}
          />
        )}
        <WithLabelErrorInput
          backgroundColor={"#fff"}
          placeholder="새 비밀번호를 입력하세요."
          placeholderTextColor="gray"
          onChangeText={(text) => handleChange("password", text)}
          error={error.password}
          secureTextEntry
        >
          <Text>비밀번호</Text>
        </WithLabelErrorInput>
        <WithLabelErrorInput
          backgroundColor={"#fff"}
          placeholder="비밀번호를 한번 더 입력해주세요."
          placeholderTextColor="gray"
          onChangeText={(text) => handleChange("password2", text)}
          error={error.password2}
          secureTextEntry
        />
        <Button
          primary
          label="저장"
          style={{ marginTop: 5, paddingVertical: 20 }}
          disabled={!(saveActive && Object.values(success).filter((v) => v === false).length < 1)}
          loading={loading.save}
          onPress={handleSave}
        />
      </ScrollView>
    </Layout>
  );
};

export default InfoEdit;
