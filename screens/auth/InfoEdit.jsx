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
import ScreenLayout from "../../components/ScreenLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";
import FastImage from "react-native-fast-image";

const InfoEdit = ({ route, navigation }) => {
  // const [user, setUser] = useRecoilState(authState);
  const [filename, setFilename] = useState();

  const { data, isLoading, isError } = useQuery(["user"]);

  const queryClient = useQueryClient();

  // const { name, eng_name, user_profile_url, email, nick, hp, location_code } = user;

  const [user, setUser] = useRecoilState(authState);
  const [selected, setSelected] = useState("");
  const [area, setArea] = useState([]);
  const [defaultValue, setDefaultValue] = useState({
    id: data.DATA.email,
    nick: data.DATA.nick,
    location_code: data.DATA.location_code,
  });
  const [imageUrl, setImageUrl] = useState("");

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const [changneValues, setChangeValues] = useState({
    ...defaultValue,
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState({});

  const toast = useToast();

  const handleChange = (type, text) => {
    setChangeValues({
      ...changneValues,
      [type]: text,
    });
    if (type === "id") {
      setSuccess({
        ...success,
        [type]: false,
      });
    } else if (type === "nick") {
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

    console.log(bodyData);

    try {
      const res = await authApi.accountEdit(formData);
      console.log(res);
      if (res.CODE === "AUI000") {
        const accountInfo = await authApi.info();
        await setStorage("user", JSON.stringify(accountInfo?.DATA));
        setUser(accountInfo?.DATA);
        queryClient.invalidateQueries(["user"]);
        navigation.navigate("Profile");
        toast.show("정보가 수정되었습니다.");
      } else {
        toast.show("정보 수정에 실패했습니다");
      }
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
    <ScreenLayout title="정보 수정" back={() => navigation.popToTop()}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => useImageUpload(status, requestPermission, setImageUrl, setFilename)} style={{ alignItems: "center", paddingVertical: 30 }}>
          <FastImage source={{ uri: imageUrl ? imageUrl : data.DATA.user_profile_url }} style={{ width: 120, height: 120, borderRadius: 60 }} resizeMode="cover" />
        </TouchableOpacity>
        <Button onPress={() => navigation.navigate("Alliance")} dark label=" 제휴 등록 " style={{ alignItems: "center" }} />
        <View gap={10}>
          <WithLabelDisableInput value={data.DATA.name}>
            <Text>이름</Text>
          </WithLabelDisableInput>
          <WithLabelErrorInput defaultValue={data.DATA.eng_name}>
            <Text>영문 이름 (GPI등재용)</Text>
          </WithLabelErrorInput>
          <WithLabelCheckErrorInput
            defaultValue={data.DATA.email}
            onChangeText={(text) => handleChange("id", text)}
            disabled={data.DATA.email === changneValues.id}
            dark={true}
            error={error.id}
            onCheck={() => handleCheck("id")}
            success={success.id}
            loading={loading.id}
          >
            <Text>이메일</Text>
          </WithLabelCheckErrorInput>
          <WithLabelCheckErrorInput
            defaultValue={data.DATA.nick}
            onChangeText={(text) => handleChange("nick", text)}
            disabled={data.DATA.nick === changneValues.nick}
            dark={data.DATA.nick !== changneValues.nick}
            error={error.nick}
            onCheck={() => handleCheck("nick")}
            success={success.nick}
            loading={loading.nick}
          >
            <Text>닉네임</Text>
          </WithLabelCheckErrorInput>
          <WithLabelDisableInput value={data.DATA.hp}>
            <Text>연락처</Text>
          </WithLabelDisableInput>
          <View style={{ paddingHorizontal: 10, flexDirection: "row", alignItems: "center", marginTop: 30, justifyContent: "space-between" }}>
            <Text>지역(시/도)</Text>
            <Text>현재 지역: {area.filter((v) => v.key === data.DATA.location_code)[0]?.value}</Text>
          </View>
          {area.length > 0 && (
            <SelectList
              boxStyles={{ marginTop: 10, backgroundColor: "#e8f0ee", borderRadius: 15, paddingVertical: 18, paddingHorizontal: 20, borderColor: "transparent" }}
              dropdownStyles={{ backgroundColor: "#e8f0ee", borderWidth: 0 }}
              dropdownItemStyles={{ paddingVertical: 10 }}
              setSelected={(val) => setSelected(val)}
              data={area}
              save="key"
              // defaultOption={{ key: String(location_code), value: area.filter((v) => v.key === location_code)[0]?.value }}
            />
          )}
          <WithLabelErrorInput placeholder="새 비밀번호를 입력하세요." placeholderTextColor="gray" onChangeText={(text) => handleChange("password", text)} error={error.password} secureTextEntry>
            <Text>비밀번호</Text>
          </WithLabelErrorInput>
          <WithLabelErrorInput
            placeholder="비밀번호를 한번 더 입력해주세요."
            placeholderTextColor="gray"
            onChangeText={(text) => handleChange("password2", text)}
            error={error.password2}
            secureTextEntry
          />
        </View>
        <Button
          primary
          label="저장"
          style={{ marginTop: 5, paddingVertical: 20 }}
          disabled={!(saveActive && Object.values(success).filter((v) => v === false).length < 1)}
          loading={loading.save}
          onPress={handleSave}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

export default InfoEdit;
