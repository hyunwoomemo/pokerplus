import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Layout from "../../components/Layout";
import { ticketApi } from "../../api";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import ReceiveItem from "../../components/ReceiveItem";
import { TicketContext } from "../../context";

const ReceiveList = () => {
  const { receiveList, setReceiveList } = useContext(TicketContext);
  const [offset, setOffset] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getReceive = async () => {
    setLoading(true);
    try {
      const res = await ticketApi.receiveList("receive", offset, currentPage);
      setReceiveList(res.DATA);
      setTotalPage(Math.ceil(res.Total / 10));
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReceive();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList data={receiveList} keyExtractor={(item, index) => `${index}-${item.ticket_info_id}`} renderItem={({ item }) => <ReceiveItem item={item} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
});

export default ReceiveList;
