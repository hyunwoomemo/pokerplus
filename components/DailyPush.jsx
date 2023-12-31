import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, LayoutAnimation, PanResponder, Pressable, Text, TouchableOpacity, View } from "react-native";
import { pushApi } from "../api";
import { useQueryClient } from "@tanstack/react-query";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const DailyPush = ({ item, dailyData, currentPage, enableSelect, selectedItem, setSelectedItem }) => {
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

    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const onPressIn = Animated.timing(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    });

    const onPressOut = Animated.timing(scale, {
      toValue: 1,
      useNativeDriver: true,
    });

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          onPressIn.start();
        },
        onPanResponderMove: (_, { dx, dy }) => {
          console.log(dx);
          position.setValue({ x: dx, y: dy });
        },
      })
    );

    return (
      <Pressable>
        <Animated.View
          {...panResponder.panHandlers}
          onResponderStart={() => console.log("touch")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#ececec",
            padding: 10,
            borderRadius: 10,
            transform: [...position.getTranslateTransform(), { scale }],
          }}
        >
          {/* {enableSelect && (
            <BouncyCheckbox
              isChecked={selectedItem.find((v) => v === item.id)}
              disableBuiltInState
              fillColor="gray"
              size={16}
              innerIconStyle={{ borderRadius: 3 }}
              iconStyle={{ borderRadius: 3 }}
              onPress={() => {
                if (selectedItem.find((v) => v === item.id)) {
                  setSelectedItem((prev) => [...prev].filter((v) => v !== item.id));
                } else {
                  setSelectedItem((prev) => [...prev, item.id].filter((v, i, arr) => arr.indexOf(v) === i));
                }
              }}
            />
          )} */}
          {!item.readDate && <View style={{ backgroundColor: "#ff3183", borderRadius: 5, width: 7, height: 7 }}></View>}
          <Text style={{ paddingVertical: 15, fontSize: 16, color: item.readDate ? "#bfbfbf" : undefined }}>{item.message}</Text>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View style={{ padding: 0 }}>
      <FlatList data={dailyData[item]} renderItem={({ item }) => <PushItem item={item} />} ListHeaderComponent={<Header />} />
    </View>
  );
};

export default DailyPush;
