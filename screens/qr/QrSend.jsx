import React, { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions, LayoutAnimation, Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import AppBar from "../../components/AppBar";
import { SelectList } from "react-native-dropdown-select-list";
import Button from "../../components/Button";
import { Entypo } from "@expo/vector-icons";
import { ticketApi } from "../../api";
import { useToast } from "react-native-toast-notifications";
import { OneSignal } from "react-native-onesignal";
import { useRecoilState } from "recoil";
import { authState } from "../../recoil/auth/atom";

const QrSend = ({ navigation, route }) => {
  const { data } = route.params;
  const [info, setInfo] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [loading, setLoading] = useState({});
  const [values, setValues] = useState({
    count: "1",
  });
  const [user, setUser] = useRecoilState(authState);

  const toast = useToast();

  useEffect(() => {
    if (info.length === 0) {
      setInfo(data);
    }
  }, []);

  const getTickets = async () => {
    const res = await ticketApi.list();
    console.log("getTickets", res);

    console.log(res);
    setTickets(res.DATA.filter((v) => v.ticket_count !== 0));
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

  const handleSend = async () => {
    setLoading({ ...loading, send: true });
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer YzFmMTg5NWUtOTI1MC00NjZlLWFjYjMtMGZjNmUwODgzNWYx",
    };
    try {
      const res = await ticketApi.send({
        send_type: "TH004",
        ticket_info_id: String(values.id),
        send_count: values.count,
        target_user_id: data.targetUser,
        memo: values.memo ? values.memo : null,
      });
      console.log("TH004", values.id, values.count, data.hp, data.name, data.targetUser, values.memo);
      console.log(res);
      if (res.CODE === "TKS000") {
        console.log("성공");
        fetch("https://onesignal.com/api/v1/notifications", {
          method: "POST",
          body: JSON.stringify({
            app_id: "ae232b11-fde8-419d-8069-9ec35bf73f62",
            include_aliases: { external_id: [data.targetUser] },
            target_channel: "push",
            data: { foo: "bar" },
            contents: { en: `${user.name}님이 티켓 ${values.count}장을 전송했습니다.` },
          }),
          headers: headers,
        })
          .then((res) => res.json())
          .then((result) => console.log("pushpush", result));
        // console.log('sdf')
        navigation.goBack();
        navigation.navigate("Tabs", { screen: "Home" });
        console.log("123");
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
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 20, alignItems: "center", marginTop: 10, textAlign: "center" }}>참가권 QR 전송</Text>
      <View style={{ padding: 20, borderWidth: StyleSheet.hairlineWidth, marginTop: 40, borderRadius: 10, gap: 20 }}>
        <View style={styles.item}>
          <Text style={styles.text}>이름</Text>
          <Text style={styles.text}>{info.name}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>닉네임</Text>
          <Text style={styles.text}>{info.nick}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>연락처</Text>
          <Text style={styles.text}>{info.hp}</Text>
        </View>
      </View>
      <SelectList
        boxStyles={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 15, paddingVertical: 18, paddingHorizontal: 20, borderColor: "transparent" }}
        dropdownStyles={{ backgroundColor: "#fff", borderWidth: 0 }}
        dropdownItemStyles={{ paddingVertical: 10 }}
        setSelected={(val) => handleChange("id", val)}
        data={selectData}
        save="key"
        placeholder="전송하실 참가권을 선택해주세요."
        defaultOption={{ key: "", value: "" }}
        dropdownTextStyles={{ fontSize: 18 }}
        notFoundText="보유하신 참가권이 없습니다."
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
            if (parseInt(text) < 0 || parseInt(text) > tickets.find((v) => v.ticket_info_id === values.id)?.ticket_count || !values.id) return;
            setValues({ ...values, count: text });
          }}
          inputMode="numeric"
          keyboardType="numeric"
        ></TextInput>
        <TouchableOpacity onPress={() => handleCount("plus")} disabled={parseInt(values.count) >= tickets.find((v) => v.ticket_info_id === values.id)?.ticket_count || !values.id}>
          <Entypo name="circle-with-plus" size={28} color={values.count >= tickets.find((v) => v.ticket_info_id === values.id)?.ticket_count || !values.id ? "gray" : "#ff2d84"} />
        </TouchableOpacity>
      </View>
      <Button loading={loading.send} onPress={handleSend} primary label="전송" style={{ marginTop: "auto" }} disabled={!selectData} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
  },
});

export default QrSend;
