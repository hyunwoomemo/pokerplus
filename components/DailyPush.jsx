import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { pushApi } from "../api";
import { useQueryClient } from "@tanstack/react-query";

const DailyPush = ({ item, dailyData, currentPage }) => {
  const Header = () => {
    return (
      <View style={{ padding: 10, backgroundColor: "rgb(221,223,226)", marginBottom: 15, borderRadius: 10 }}>
        <Text style={{ fontSize: 16 }}>{item}</Text>
      </View>
    );
  };

  const PushItem = ({ item }) => {
    const [type, setType] = useState();
    const navigation = useNavigation();
    const queryClient = useQueryClient();

    useEffect(() => {
      if (item.message.indexOf("티켓") > -1) {
        setType("ticket");
      }
    }, [item]);

    const handlePress = async (id) => {
      switch (type) {
        case "ticket":
          navigation.navigate("TicketNav");
      }

      const res = await pushApi.read(id);
      queryClient.invalidateQueries(["push", currentPage]);
      queryClient.invalidateQueries(["pushUnRead"]);
    };

    return (
      <TouchableOpacity onPress={() => handlePress(item.id)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {!item.readDate && <View style={{ backgroundColor: "#ff3183", borderRadius: 5, width: 7, height: 7 }}></View>}
          <Text style={{ padding: 15, fontSize: 16, color: item.readDate ? "#bfbfbf" : undefined }}>{item.message}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <FlatList data={dailyData[item]} renderItem={({ item }) => <PushItem item={item} />} ListHeaderComponent={<Header />} />
    </View>
  );
};

export default DailyPush;
