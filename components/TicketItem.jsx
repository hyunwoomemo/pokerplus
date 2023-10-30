import React, { useCallback, useRef } from "react";
import { Animated, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import { useFocusEffect } from "@react-navigation/native";

const TicketItem = ({ item, index }) => {
  const { ticket_logo_url, ticket_name, ticket_count } = item;

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
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

  return (
    <Animated.View style={{ ...styles.container, opacity, transform: [{ scale }] }}>
      <FastImage
        source={{ uri: ticket_logo_url || "https://data.spolive.com/data/template/t08/common/footer_icon_ticket.png" }}
        style={ticket_logo_url ? { width: 80, height: 40 } : { width: 80, height: 40 }}
        resizeMode="contain"
      />

      <Text style={styles.name}>{ticket_name}</Text>
      <View style={styles.count}>
        <MaterialCommunityIcons name="ticket-confirmation" size={24} color="rgba(0,0,0,0.8)" />
        <Text style={styles.countText}>{ticket_count}장</Text>
      </View>
    </Animated.View>
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
