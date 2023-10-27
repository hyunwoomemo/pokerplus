import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";

const TicketItem = ({ item }) => {
  const { ticket_logo_url, ticket_name, ticket_count } = item;
  return (
    <TouchableOpacity style={styles.container}>
      <FastImage
        source={{ uri: ticket_logo_url || "https://newgenerationdatadev.blob.core.windows.net/data/template/t08/common/footer_icon_ticket.png" }}
        style={ticket_logo_url ? { width: 80, height: 40 } : { width: 40, height: 20 }}
        resizeMode="contain"
      />

      <Text style={styles.name}>{ticket_name}</Text>
      <View style={styles.count}>
        <MaterialCommunityIcons name="ticket-confirmation" size={24} color="rgba(0,0,0,0.8)" />
        <Text style={styles.countText}>{ticket_count}장</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
  },
  count: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  countText: {
    fontSize: 15,
  },
});

export default TicketItem;
