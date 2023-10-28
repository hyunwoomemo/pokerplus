import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import ModalComponent from "./Modal";

const Select = ({ label, visible, setVisible, hideModal, data, headerText }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => setVisible(true)}
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
        <Text style={{ fontSize: 16 }}>{selectTicket && Object.keys(selectTicket).length ? `${selectTicket?.ticket_name} (${selectTicket?.ticket_count})` : label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Select;
