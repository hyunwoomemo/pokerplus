import { useFocusEffect, useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "react-native-svg";

const QnaItem = ({ item, index, page, status }) => {
  const navigation = useNavigation();

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

  const itemStatus = (code) => {
    return status?.filter((item) => item.code === code)[0]?.title;
  };

  return (
    <Animated.View style={page === 1 && { opacity, transform: [{ scale }] }}>
      <TouchableOpacity key={item.id} style={styles.itemWrapper} onPress={() => navigation.navigate("QnaDetail", { qna: item })}>
        <LinearGradient colors={["#4c56fa", "#bb21a8"]} start={{ x: 1, y: 0 }} style={styles.gradient} end={{ x: 0, y: 0 }}>
          <View style={styles.innerContainer}>
            <Text style={styles.status}>{itemStatus(item.status_code)}</Text>
          </View>
        </LinearGradient>
        <View style={styles.contentsWrapper}>
          <View style={styles.itemheader}>
            <Text style={styles.itemheaderText}>{item.company_name}</Text>
            <Text style={styles.itemheaderText}>{moment(item.created_at).utc().add(9, "h").format("YY/MM/DD HH:mm:ss")}</Text>
          </View>
          <Text style={{ fontSize: 18 }}>{item.contents}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0,0,0.2)",
  },
  main: {},
  innerContainer: {
    borderRadius: 15, // <-- Inner Border Radius
    flex: 1,
    margin: 2, // <-- Border Width
    backgroundColor: "#ecf2f0",
    justifyContent: "center",
  },
  itemWrapper: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0,0,0.1)",
  },
  contentsWrapper: {
    flex: 1,
    gap: 10,
  },
  itemheader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemheaderText: {
    color: "gray",
    fontSize: 16,
  },
  gradient: {
    height: 50,
    width: 50,
    borderRadius: 18, // <-- Outer Border Radius
  },
  status: {
    textAlign: "center",
    margin: 5,
    color: "#cc2b5e",
    backgroundColor: "transparent",
    fontSize: 16,
  },
});

export default QnaItem;
