import React, { useState, useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Button from "../../components/Button";
import { Entypo } from "@expo/vector-icons";
import { qrApi, ticketApi } from "../../api";
import { useToast } from "react-native-toast-notifications";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ModalComponent from "../../components/Modal";
import FastImage from "react-native-fast-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenLayout from "../../components/ScreenLayout";
import { LayoutAnimation } from "react-native";
import Error from "../../components/Error";

const QrSend = ({ navigation, route }) => {
  const [info, setInfo] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectTicket, setSelectTicket] = useState([]);
  const [loading, setLoading] = useState({});
  const [values, setValues] = useState({
    count: "1",
  });
  const [ticketVisible, setTicketVisible] = useState(false);

  const handleSelectTicket = (item) => {
    setTicketVisible(false);
    setSelectTicket(item);
    setValues({
      ...values,
      count: "1",
      id: item.ticket_info_id,
    });
  };

  const hideTicketModal = () => {
    setTicketVisible(false);
    setSelectTicket();
    setValues({
      ...values,
      count: "1",
    });
  };

  const queryClient = useQueryClient();
  const toast = useToast();

  useEffect(() => {
    if (route.params.data) {
      if (info?.length === 0) {
        setInfo(route.params.data);
      }
    } else if (route.params.url) {
      const getData = async () => {
        try {
          setLoading({
            ...loading,
            url: true,
          });
          const URL = route.params.url;
          const hash = URL.slice(URL.lastIndexOf("/") + 1);
          const res = await qrApi.getInfo(hash);
          setInfo(res?.DATA);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading({
            ...loading,
            url: false,
          });
        }
      };

      getData();
    }
  }, []);

  const { data: ticketData, isLoading, isError } = useQuery(["myticket"], ticketApi.list);

  useEffect(() => {
    setTickets(ticketData?.DATA.filter((v) => v.ticket_count !== 0));
  }, [ticketData]);

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
    try {
      const res = await ticketApi.send({
        send_type: "TH004",
        ticket_info_id: String(values.id),
        send_count: values.count,
        target_user_id: info.targetUser,
        memo: values.memo ? values.memo : null,
      });

      if (res.CODE === "TKS000") {
        navigation.goBack();
        navigation.navigate("Tabs", { screen: "Home" });
        toast.show("티켓을 전송했습니다.");
        queryClient.invalidateQueries(["myticket"]);
        queryClient.invalidateQueries(["send"]);
        queryClient.invalidateQueries(["user"]);
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

  const Separator = () => {
    return <View style={{ borderBottomWidth: 1, borderColor: "#ececec" }} />;
  };

  const Header = () => {
    return (
      <View style={{ paddingBottom: 20, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 18, color: "gray" }}>전송하실 참가권을 선택해주세요</Text>
      </View>
    );
  };

  if (isError) {
    return <Error />;
  }

  if (!info) {
    return <Error />;
  }

  if (loading.url) {
    return <ActivityIndicator size={"large"} color={"#ff3183"} style={StyleSheet.absoluteFillObject} />;
  }

  return (
    <ScreenLayout title={"참가권 QR 전송"} style={{ flex: 1, gap: 10 }}>
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "#ecf2f0", padding: 20 }}>
        <View style={{ padding: 20, borderWidth: StyleSheet.hairlineWidth, marginTop: 40, borderRadius: 10, gap: 20 }}>
          <View style={styles.item}>
            <Text style={styles.text}>이름</Text>
            <Text style={styles.text}>{info?.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>닉네임</Text>
            <Text style={styles.text}>{info?.nick}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>연락처</Text>
            <Text style={styles.text}>{info?.hp}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setTicketVisible(true)}
          style={{
            marginVertical: 20,
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
            backgroundColor: "#ecf2f0",
            borderRadius: 15,
            paddingVertical: 18,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => handleCount("minus")} disabled={values.count < 1 || !selectTicket || !Object.keys(selectTicket).length}>
            <Entypo name="circle-with-minus" size={28} color={values.count < 1 || !selectTicket || !Object.keys(selectTicket).length ? "gray" : "#5a50ef"} />
          </TouchableOpacity>
          <TextInput
            value={values.count}
            onChangeText={(text) => {
              if (parseInt(text) < 0 || parseInt(text) > tickets.find((v) => v.ticket_info_id === values.id)?.ticket_count || !selectTicket || !Object.keys(selectTicket).length) return;
              setValues({ ...values, count: text });
            }}
            inputMode="numeric"
            keyboardType="numeric"
            style={{ flex: 1, textAlign: "center" }}
          ></TextInput>
          <TouchableOpacity
            onPress={() => handleCount("plus")}
            disabled={parseInt(values.count) >= tickets.find((v) => v.ticket_info_id === values.id)?.ticket_count || !selectTicket || !Object.keys(selectTicket).length}
          >
            <Entypo
              name="circle-with-plus"
              size={28}
              color={values.count >= tickets.find((v) => v.ticket_info_id === values.id)?.ticket_count || !selectTicket || !Object.keys(selectTicket).length ? "gray" : "#ff2d84"}
            />
          </TouchableOpacity>
        </View>

        <Button loading={loading.send} onPress={handleSend} primary label="전송" style={{ marginTop: 50 }} disabled={!selectTicket || !Object.keys(selectTicket).length} />
      </KeyboardAwareScrollView>
    </ScreenLayout>
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
