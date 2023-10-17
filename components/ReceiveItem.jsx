import React from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import moment from "moment";

const codeText = [
  { code: "TH001", text: "상금지급" },
  { code: "TH002", text: "대회사지급" },
  { code: "TH003", text: "일반수령" },
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

const ReceiveItem = ({ item }) => {
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
    <TouchableOpacity style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.firstline}>
          <Text style={styles.text}>{prev_owner_name}</Text>
          <Text style={styles.text}>{moment(created_at).utc().format("YY/MM/DD")}</Text>
        </View>
        <View style={styles.secondline}>
          <Image source={{ uri: ticket_logo_url }} width={70} height={30} style={{ borderRadius: 5 }} resizeMode="cover" />
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    flex: 1,
    padding: 15,
    borderTopWidth: 1,
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
  },
});

export default ReceiveItem;
