import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Keyboard, LayoutAnimation, Text, TextInput, View } from "react-native";
import { ticketApi } from "../../api";
import { SelectList } from "react-native-dropdown-select-list";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useToast } from "react-native-toast-notifications";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRecoilState } from "recoil";
import { authState } from "../../recoil/auth/atom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "@react-navigation/native";
import { Modal, Portal } from "react-native-paper";
import ModalComponent from "../../components/Modal";
import FastImage from "react-native-fast-image";
import Error from "../../components/Error";

const Send = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState({});
  const [visible, setVisible] = React.useState(false);
  const { height } = Dimensions.get("window");
  const [sendVisible, setSendVisible] = useState(false);
  const [ticketVisible, setTicketVisible] = useState(false);
  const [selectTicket, setSelectTicket] = useState([]);
  const sendHideModal = () => {
    setSendVisible(false);
  };

  const [user, setUser] = useRecoilState(authState);

  const hideModal = (type) => {
    if (type !== "ok") {
      setValues({
        ...values,
        userId: "",
        name: "",
      });
    }
    setVisible(false);
  };

  const hideTicketModal = () => {
    setTicketVisible(false);
    setSelectTicket();
  };

  const queryClient = useQueryClient();

  const [values, setValues] = useState({
    count: "1",
  });

  const disableMyHP = user.hp === values?.hp?.replaceAll("-", "");

  useEffect(() => {
    if (disableMyHP) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
  }, [disableMyHP]);

  const { data, isLoading, isError } = useQuery(["myticket"], ticketApi.list);

  useEffect(() => {
    setTickets(data?.DATA?.filter((v) => v.ticket_count != 0));
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setValues({
          count: "1",
        });
        setSelectTicket();
      };
    }, [])
  );

  const handleCount = (type) => {
    if (type === "minus") {
      setValues({
        ...values,
        count: parseInt(values.count) <= 0 ? 0 : String(parseInt(values.count) - 1),
      });
    } else {
      setValues({
        ...values,
        count: values.count >= tickets?.find((v) => v.id === values.id)?.ticket_count ? String(tickets?.find((v) => v.ticket_info_id === values.id)?.ticket_count) : String(parseInt(values.count) + 1),
      });
    }
  };

  const toast = useToast();

  const handleFindUser = async () => {
    Keyboard.dismiss();
    setLoading({ ...loading, find: true });
    try {
      const res = await ticketApi.findUser(values?.hp?.replaceAll("-", ""));
      if (res.CODE === "TSR000") {
        setVisible(true);
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
    } finally {
      setLoading({ ...loading, find: false });
    }
  };

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
      if (res.CODE === "TKS000") {
        queryClient.invalidateQueries(["myticket"]);
        queryClient.invalidateQueries(["send"]);
        queryClient.invalidateQueries(["user"]);
        setValues({});
        navigation.navigate("SendList");
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
            f;
            toast.show("전송에 실패했습니다.");
            break;
          case "TKS005":
            toast.show("필수값이 입력되지 않았습니다.");
            break;
        }
      }
    } catch (err) {
    } finally {
      setLoading({ ...loading, send: false });
      sendHideModal();
      setValues({ count: "1" });
    }
  };

  const Separator = () => {
    return <View style={{ borderBottomWidth: 1, borderColor: "#ececec" }}></View>;
  };

  const Header = () => {
    return (
      <View style={{ paddingBottom: 20, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 18, color: "gray" }}>전송하실 참가권을 선택해주세요</Text>
      </View>
    );
  };

  const handleSelectTicket = (item) => {
    setTicketVisible(false);
    setSelectTicket(item);
    setValues({
      ...values,
      count: "1",
      id: item.ticket_info_id,
    });
  };

  if (isError) {
    return <Error />;
  }

  return (
    <View>
      <KeyboardAwareScrollView>
        <View style={{ padding: 20, flex: 1 }}>
          <TouchableOpacity
            onPress={() => setTicketVisible(true)}
            style={{
              marginTop: 10,
              backgroundColor: "#fff",
              borderRadius: 50,
              paddingVertical: 18,
              paddingHorizontal: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>{selectTicket && Object.keys(selectTicket).length ? `${selectTicket?.ticket_name} (${selectTicket?.ticket_count})` : "참가권 선택"}</Text>
          </TouchableOpacity>
          <ModalComponent visible={ticketVisible} hideModal={hideTicketModal}>
            <FlatList
              data={tickets}
              keyExtractor={(item, index) => `${index}-${item.ticket_info_id}`}
              ItemSeparatorComponent={<Separator />}
              ListHeaderComponent={<Header />}
              stickyHeaderIndices={[0]}
              // StickyHeaderComponent={<Header />}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectTicket(item)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20 }}>
                  <FastImage
                    source={{ uri: item.ticket_logo_url || "https://data.spolive.com/data/template/t08/common/footer_icon_ticket.png" }}
                    style={item.ticket_logo_url ? { width: 70, height: 30 } : { width: 70, height: 30 }}
                    resizeMode="contain"
                  />
                  <Text style={{ fontSize: 16 }}>{item.ticket_name}</Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <FastImage source={{ uri: "https://data.spolive.com/data/template/t08/common/footer_icon_ticket.png" }} style={{ width: 20, height: 20 }} resizeMode="contain" tintColor="gray" />
                    <Text style={{ fontSize: 16 }}>{item.ticket_count}장</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </ModalComponent>
          <View
            style={{
              marginTop: 10,
              backgroundColor: "#fff",
              borderRadius: 50,
              paddingVertical: 18,
              paddingHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => handleCount("minus")} disabled={values.count < 1 || !values.id}>
              <Entypo name="circle-with-minus" size={28} color={values.count < 1 || !values.id ? "gray" : "#5a50ef"} />
            </TouchableOpacity>

            <TextInput
              value={values.count}
              style={{ flex: 1, textAlign: "center" }}
              onChangeText={(text) => {
                if (parseInt(text) < 0 || parseInt(text) > tickets?.find((v) => v.ticket_info_id === values.id)?.ticket_count || !values.id) return;
                setValues({ ...values, count: text });
              }}
              inputMode="numeric"
              keyboardType="numeric"
            ></TextInput>
            <TouchableOpacity onPress={() => handleCount("plus")} disabled={parseInt(values.count) >= tickets?.find((v) => v.ticket_info_id === values.id)?.ticket_count || !values.id}>
              <Entypo name="circle-with-plus" size={28} color={values.count >= tickets?.find((v) => v.ticket_info_id === values.id)?.ticket_count || !values.id ? "gray" : "#ff2d84"} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TextInput
              placeholder="상대방 핸드폰 번호"
              value={values.hp}
              maxLength={13}
              onChangeText={(text) => {
                text = text
                  .replace(/[^0-9]/g, "")
                  .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                  .replace(/(\-{1,2})$/g, "");
                setValues({ ...values, name: "", hp: text });
              }}
              style={{ fontSize: 16, marginTop: 10, backgroundColor: "#fff", borderRadius: 50, paddingVertical: 18, paddingHorizontal: 20, flex: 3 }}
              onSubmitEditing={(text) => handleFindUser(text)}
              inputMode="tel"
              keyboardType="number-pad"
            ></TextInput>
            {values.name && !visible && (
              <View style={{ marginTop: 10, backgroundColor: "#dbdbdb", borderRadius: 50, paddingVertical: 18, paddingHorizontal: 20, flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>{values.name}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={handleFindUser}
              disabled={!values.hp || disableMyHP}
              style={
                values.hp && !disableMyHP
                  ? { marginTop: 10, backgroundColor: "#383838", borderRadius: 50, paddingVertical: 18, paddingHorizontal: 20, flex: 1, alignItems: "center", justifyContent: "center" }
                  : { marginTop: 10, backgroundColor: "#969696", borderRadius: 50, paddingVertical: 18, paddingHorizontal: 20, flex: 1, alignItems: "center", justifyContent: "center" }
              }
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>{loading.find ? <ActivityIndicator color="#fff" size={21} /> : "조회"}</Text>
            </TouchableOpacity>
          </View>
          {disableMyHP && <Text style={{ paddingHorizontal: 10, paddingVertical: 10, color: "tomato" }}>자신의 번호로 티켓 전송할 수 없습니다.</Text>}
          <ModalComponent visible={visible} hideModal={hideModal}>
            <View style={{ justifyContent: "center", paddingHorizontal: 20, alignItems: "center", gap: 30 }}>
              <Text style={{ fontSize: 18 }}>사용자 정보 조회 결과</Text>
              <Text style={{ fontSize: 18, color: "#ff3183", fontWeight: "bold" }}>번호: {values.hp}</Text>
              <Text style={{ fontSize: 18 }}>이름: {values.name}</Text>
              <View style={{ flexDirection: "row", gap: 10, marginTop: 30 }}>
                <Button style={{ flex: 1 }} label="취소" onPress={() => hideModal("cancel")} />
                <Button style={{ flex: 1 }} label="확인" dark onPress={() => hideModal("ok")} />
              </View>
            </View>
          </ModalComponent>
          <TextInput
            placeholder="메모를 입력하세요."
            multiline={true}
            value={values.memo}
            style={{
              marginTop: 10,
              backgroundColor: "#fff",
              borderRadius: 15,
              paddingVertical: 18,
              paddingHorizontal: 20,
              flex: 1,
              marginBottom: 30,
              minHeight: height / 10,
              paddingTop: 20,
              fontSize: 16,
            }}
            onChangeText={(text) => setValues({ ...values, memo: text })}
          ></TextInput>
          <Button onPress={() => setSendVisible(true)} primary label="전송" style={{ marginTop: "auto" }} disabled={!(values.hp?.length > 0 && values.name?.length > 0 && selectTicket)} />
          <ModalComponent visible={sendVisible} hideModal={sendHideModal} half>
            <View style={{ alignItems: "center", gap: 10 }}>
              <Text style={{ fontSize: 16 }}>이름: {values.name}</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>번호: {values.hp}</Text>
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "gray",
                  paddingVertical: 15,
                  marginVertical: 10,
                  paddingHorizontal: 20,
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 30,
                }}
              >
                <FastImage source={{ uri: selectTicket?.ticket_logo_url }} style={{ width: 70, height: 30 }} />
                <Text style={{ fontSize: 16 }}>{selectTicket?.ticket_name}</Text>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <FastImage source={{ uri: "https://data.spolive.com/data/template/t08/common/footer_icon_ticket.png" }} style={{ width: 20, height: 20 }} resizeMode="contain" tintColor="gray" />
                  <Text style={{ fontSize: 16 }}>{values.count}장</Text>
                </View>
              </View>
              <Text style={{ fontSize: 16, paddingVertical: 10 }}>위 내용으로 참가권이 전송됩니다.</Text>
              <Text style={{ fontSize: 16, color: "#ff3183", fontWeight: "bold" }}>(전송을 완료할 경우 취소할 수 없습니다.)</Text>
              <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                <Button label={"취소"} onPress={sendHideModal} style={{ flex: 1 }} />
                <Button label={"확인"} loading={loading.send} onPress={handleSend} primary style={{ flex: 1 }} />
              </View>
            </View>
          </ModalComponent>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Send;
