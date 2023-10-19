import React, { useEffect, useState } from "react";
import { ActivityIndicator, LayoutAnimation, Text, TextInput, View } from "react-native";
import Layout from "../../components/Layout";
import { ticketApi } from "../../api";
import { SelectList } from "react-native-dropdown-select-list";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useToast } from "react-native-toast-notifications";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Send = () => {
  const [tickets, setTickets] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [loading, setLoading] = useState({});

  const [values, setValues] = useState({
    count: "1",
  });

  const getTickets = async () => {
    const res = await ticketApi.list();
    console.log(res);
    setTickets(res.DATA);
  };

  useEffect(() => {
    if (tickets?.length === 0) {
      getTickets();
    }
  }, []);

  useEffect(() => {
    if (selectData?.length === 0) {
      tickets.forEach((v) => {
        setSelectData((prev) => [
          ...prev,
          {
            key: v.ticket_info_id,
            value: v.ticket_name + ` (${v.ticket_count})`,
          },
        ]);
      });
    }
  }, [tickets]);

  const handleChange = (type, val) => {
    setValues({
      ...values,
      count: "1",
      [type]: val,
    });
  };

  const handleCount = (type) => {
    if (type === "minus") {
      setValues({
        ...values,
        count: parseInt(values.count) <= 0 ? 0 : String(parseInt(values.count) - 1),
      });
    } else {
      setValues({
        ...values,
        count: values.count >= tickets.find((v) => v.id === values.id)?.ticket_count ? String(tickets.find((v) => v.ticket_info_id === values.id)?.ticket_count) : String(parseInt(values.count) + 1),
      });
    }
  };

  console.log(values.count);
  const toast = useToast();

  const handleFindUser = async () => {
    setLoading({ ...loading, find: true });
    try {
      const res = await ticketApi.findUser(values.hp);
      console.log(res);
      if (res.CODE === "TSR000") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setValues({ ...values, name: res.DATA.name, userId: res.DATA.targetUser });
      } else {
        switch (res.CODE) {
          case "TSR001":
            toast.show("전화번호가 유효하지 않습니다.");
            break;
          case "TSR002":
            toast.show("권한이 없습니다.");
            break;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading({ ...loading, find: false });
    }
  };

  console.log(!(values.hp?.length > 0 && values.name?.length > 0));

  const handleSend = async () => {
    setLoading({ ...loading, send: true });
    try {
      const res = await ticketApi.send({
        send_type: "TH003",
        ticket_info_id: values.id,
        send_count: values.count,
        target_user_id: values.userId,
        memo: values.memo ? values.memo : null,
      });
      console.log(res);
      if (res.CODE === "TKS000") {
        console.log("성공");
      } else {
        switch (res.CODE) {
          case "TKS001":
            toast.show("받을 유저아이디가 유효하지 않습니다.");
            break;
          case "TKS002":
            toast.show("권한이 없습니다.");
            break;
          case "TKS003":
            toast.show("데이터베이스 오류입니다.");
            break;
          case "TKS004":
            toast.show("전송에 실패했습니다.");
            break;
          case "TKS005":
            toast.show("필수값이 입력되지 않았습니다.");
            break;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading({ ...loading, send: false });
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={{ padding: 20, flex: 1 }}>
        <SelectList
          boxStyles={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 15, paddingVertical: 18, paddingHorizontal: 20, borderColor: "transparent" }}
          dropdownStyles={{ backgroundColor: "#fff", borderWidth: 0 }}
          dropdownItemStyles={{ paddingVertical: 10 }}
          setSelected={(val) => handleChange("id", val)}
          data={selectData}
          save="key"
          placeholder="전송하실 참가권을 선택해주세요."
          defaultOption={{ key: "", value: "" }}
        />
        <View
          style={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 15, paddingVertical: 18, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <TouchableOpacity onPress={() => handleCount("minus")} disabled={values.count < 1 || !values.id}>
            <Entypo name="circle-with-minus" size={28} color={values.count < 1 || !values.id ? "gray" : "#5a50ef"} />
          </TouchableOpacity>
          <TextInput
            value={values.count}
            onChangeText={(text) => {
              if (parseInt(text) < 0 || parseInt(text) >= tickets.find((v) => v.ticket_info_id === values.id)?.ticket_count || !values.id) return;
              // if (text < 0 || text >= tickets.find((v) => v.ticket_info_id === values.ticket_info_id)?.ticket_count) return;
              setValues({ ...values, count: text });
            }}
            inputMode="numeric"
            keyboardType="numeric"
          ></TextInput>
          <TouchableOpacity onPress={() => handleCount("plus")} disabled={parseInt(values.count) >= tickets.find((v) => v.ticket_info_id === values.id)?.ticket_count || !values.id}>
            <Entypo name="circle-with-plus" size={28} color={values.count >= tickets.find((v) => v.ticket_info_id === values.id)?.ticket_count || !values.id ? "gray" : "#ff2d84"} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TextInput
            onChangeText={(text) => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              setValues({ ...values, name: "", hp: text });
            }}
            style={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 15, paddingVertical: 18, paddingHorizontal: 20, flex: 4 }}
            onSubmitEditing={(text) => handleFindUser(text)}
            inputMode="tel"
            keyboardType="number-pad"
          ></TextInput>
          {values.name && (
            <View style={{ marginTop: 10, backgroundColor: "#dbdbdb", borderRadius: 15, paddingVertical: 18, paddingHorizontal: 20, flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>{values.name}</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={handleFindUser}
            style={
              values.hp
                ? { marginTop: 10, backgroundColor: "#383838", borderRadius: 15, paddingVertical: 18, paddingHorizontal: 20, flex: 1, alignItems: "center", justifyContent: "center" }
                : { marginTop: 10, backgroundColor: "#969696", borderRadius: 15, paddingVertical: 18, paddingHorizontal: 20, flex: 1, alignItems: "center", justifyContent: "center" }
            }
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>{loading.find ? <ActivityIndicator color="#fff" size={15} /> : "조회"}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="메모를 입력하세요."
          multiline={true}
          style={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 15, paddingVertical: 18, paddingHorizontal: 20, flex: 1, marginBottom: 30 }}
          onChangeText={(text) => setValues({ ...values, memo: text })}
        ></TextInput>
        <Button onPress={handleSend} primary label="전송" style={{ marginTop: "auto" }} disabled={!(values.hp?.length > 0 && values.name?.length > 0)} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Send;
