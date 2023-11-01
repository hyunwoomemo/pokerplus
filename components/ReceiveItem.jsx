import React, { useCallback, useRef, useState } from "react";
import { Animated, Image } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import moment from "moment";
import FastImage from "react-native-fast-image";
import ModalComponent from "./Modal";
import Button from "./Button";
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";

const codeText = [
  { code: "TH001", text: "상금지급" },
  { code: "TH002", text: "대회사지급" },
  { code: "TH003", text: "일반수령" },
  { code: "TH004", text: "QR수령" },
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

const ReceiveItem = ({ item, index, page }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  useFocusEffect(
    useCallback(() => {
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
        delay: index * 50,
      }).start();
      return () => {
        Animated.spring(opacity, {
          toValue: 1,
          useNativeDriver: true,
          delay: index * 50,
        }).reset();
      };
    }, [])
  );

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

  const [detailVisible, setDetailVisible] = useState(false);
  const hideModal = () => {
    setDetailVisible(false);
  };

  const handleDetailModal = () => {
    setDetailVisible(true);
  };

  return (
    <Animated.View style={page === 1 ? { ...styles.container, opacity, transform: [{ scale }] } : styles.container}>
      <TouchableOpacity style={styles.contentWrapper} onPress={handleDetailModal}>
        <View style={styles.firstline}>
          <Text style={styles.text}>{prev_owner_name}</Text>
          <Text style={styles.text}>{moment(created_at).utc().add(9, "h").format("YY/MM/DD")}</Text>
        </View>
        <View style={styles.secondline}>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <FastImage
              source={{ uri: ticket_logo_url || "https://data.spolive.com/data/template/t08/common/footer_icon_ticket.png" }}
              style={ticket_logo_url ? { width: 70, height: 30 } : { width: 70, height: 30 }}
              resizeMode="contain"
            />
            <Text numberOfLines={2} style={styles.ticketname}>
              {ticket_name}
            </Text>
          </View>
          <View style={styles.countitem}>
            <MaterialCommunityIcons name="ticket-confirmation" size={20} color="rgba(0,0,0,0.8)" />
            <Text style={styles.text}>{count}장</Text>
          </View>
        </View>
      </TouchableOpacity>
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
            <View style={{ gap: 5, flexDirection: "row" }}>
              <FastImage
                source={{ uri: ticket_logo_url || "https://data.spolive.com/data/template/t08/common/footer_icon_ticket.png" }}
                style={ticket_logo_url ? { width: 70, height: 30 } : { width: 70, height: 30 }}
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
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ flex: 1 }}></View>
            <Button label={"닫기"} dark style={{ flex: 2, marginTop: 15 }} onPress={hideModal} />
            <View style={{ flex: 1 }}></View>
          </View>
        </View>
      </ModalComponent>
    </Animated.View>
  );
};

const DetailText = styled.Text`
  font-size: 16px;
`;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    flex: 1,
    padding: 15,
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
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    width: "50%",
  },
  text: {
    fontSize: 15,
  },
  codetext: {
    color: "gray",
    textAlign: "center",
    lineHeight: 18,
  },
  detailItemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ReceiveItem;
