import React, { useCallback, useContext, useEffect, useState } from "react";
import { LayoutAnimation, Text, View } from "react-native";
import Layout from "../../components/Layout";
import { ticketApi } from "../../api";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import ReceiveItem from "../../components/ReceiveItem";
import SendItem from "../../components/SendItem";
import { useFocusEffect } from "@react-navigation/native";
import { TicketContext } from "../../context";

const SendList = () => {
  const { sendList, setSendList } = useContext(TicketContext);
  const [offset, setOffset] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getSends = async () => {
    setLoading(true);
    try {
      const res = await ticketApi.sendList("send", offset, currentPage);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setSendList(res.DATA);
      setTotalPage(Math.ceil(res.Total / 10));
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSends();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList data={sendList} keyExtractor={(item, index) => `${index}.${item.ticket_info_id}`} renderItem={({ item }) => <SendItem item={item} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
});

export default SendList;
