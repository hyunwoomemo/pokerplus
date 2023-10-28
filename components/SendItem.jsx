import React, { useState } from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import moment from "moment";
import FastImage from "react-native-fast-image";
import ModalComponent from "./Modal";
import styled from "styled-components/native";
import Button from "./Button";

const codeText = [
  { code: "TH001", text: "상금지급" },
  { code: "TH002", text: "대회사지급" },
  { code: "TH003", text: "일반전송" },
  { code: "TH004", text: "QR전송" },
  { code: "TH005", text: "회수" },
];

const styleCodeText = (text) => {
  if (text.indexOf("전송") > -1) {
    const index = text.indexOf("전송");
    text = text.slice(0, index) + "\n" + text.slice(index);
    return text;
  } else if (text.indexOf("지급") > -1) {
    const index = text.indexOf("지급");
    text = text.slice(0, index) + "\n" + text.slice(index);
    return text;
  } else if (text.indexOf("수령") > -1) {
    const index = text.indexOf("수령");
    text = text.slice(0, index) + "\n" + text.slice(index);
    return text;
  }
  return text;
};

const SendItem = ({ item }) => {
  const [detailVisible, setDetailVisible] = useState(false);
  const hideModal = () => {
    setDetailVisible(false);
  };

  const handleDetailModal = () => {
    setDetailVisible(true);
  };
  const {
    ticket_info_id,
    ticket_history_code,
    ticket_name,
    ticket_logo_url,
    prev_owner_id,
    prev_owner_type,
    prev_owner_name,
    now_owner_id,
    now_owner_type,
    now_owner_name,
    count,
    description,
    created_at,
  } = item;
  return (
    <TouchableOpacity style={styles.container} onPress={handleDetailModal}>
      <View style={styles.contentWrapper}>
        <View style={styles.firstline}>
          <Text style={styles.text}>{now_owner_name}</Text>
          <Text style={styles.text}>{moment(created_at).utc().format("YY/MM/DD")}</Text>
        </View>
        <View style={styles.secondline}>
          <FastImage
            source={{ uri: ticket_logo_url || "https://data.spolive.com/data/template/t08/common/footer_icon_ticket.png" }}
            style={ticket_logo_url ? { width: 70, height: 30 } : { width: 40, height: 20 }}
            resizeMode="contain"
          />
          <Text style={styles.ticketname}>{ticket_name}</Text>
          <View style={styles.countitem}>
            <MaterialCommunityIcons name="ticket-confirmation" size={20} color="rgba(0,0,0,0.8)" />
            <Text style={styles.text}>{count}장</Text>
          </View>
        </View>
      </View>
      <View style={styles.codebutton}>
        <Text style={styles.codetext}>{styleCodeText(codeText.find((v) => v.code === ticket_history_code).text)}</Text>
      </View>
      <ModalComponent visible={detailVisible} hideModal={hideModal}>
        <View style={{ gap: 20 }}>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth }}>
            <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 20 }}>{codeText.find((v) => v.code === ticket_history_code).text}</Text>
          </View>
          <View style={styles.detailItemWrapper}>
            <DetailText>날짜</DetailText>
            <DetailText>{moment(item.created_at).utc().add(9, "h").format("YYYY/MM/DD HH:mm:ss")}</DetailText>
          </View>
          <View style={styles.detailItemWrapper}>
            <DetailText>발신자</DetailText>
            <DetailText>{prev_owner_name}</DetailText>
          </View>
          <View style={styles.detailItemWrapper}>
            <DetailText>참가권 명</DetailText>
            <View style={{ gap: 5, flexDirection: "row", alignItems: "center" }}>
              <FastImage
                source={{ uri: ticket_logo_url || "https://data.spolive.com/data/template/t08/common/footer_icon_ticket.png" }}
                style={ticket_logo_url ? { width: 70, height: 30 } : { width: 40, height: 20 }}
                resizeMode="contain"
              />
              <DetailText>{ticket_name}</DetailText>
            </View>
          </View>
          <View style={styles.detailItemWrapper}>
            <DetailText>수량</DetailText>
            <DetailText>{count}</DetailText>
          </View>
          {description && (
            <View style={{ gap: 20 }}>
              <DetailText>메모</DetailText>
              <View style={{ borderRadius: 15, padding: 15, minHeight: 100, borderWidth: StyleSheet.hairlineWidth }}>
                <DetailText>{description}</DetailText>
              </View>
            </View>
          )}
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <View style={{ flex: 1 }}></View>
            <Button label={"닫기"} dark style={{ flex: 2, marginTop: 15 }} onPress={hideModal} />
            <View style={{ flex: 1 }}></View>
          </View>
        </View>
      </ModalComponent>
    </TouchableOpacity>
  );
};

const DetailText = styled.Text`
  font-size: 16px;
`;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    flex: 1,
    padding: 15,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    marginHorizontal: 10,
  },
  contentWrapper: {
    flex: 1,
    gap: 10,
  },
  firstline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  secondline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  codebutton: {
    width: 70,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    shadowColor: "#000",
  },
  countitem: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  ticketname: {
    fontSize: 18,
  },
  text: {
    fontSize: 15,
  },
  codetext: {
    color: "gray",
    lineHeight: 18,
    textAlign: "center",
  },
  detailItemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SendItem;
