import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Pagination = ({ totalPage, currentPage, setCurrentPage, groupCount, totalGroup, currentGroup, setCurrentGroup }) => {
  const handleArrowClick = (type) => {
    // type === "prev" ? setCurrentPage((p) => p - 1) : setCurrentPage((p) => p + 1);
    if (type === "prev") {
      if (currentPage % groupCount === 1) {
        setCurrentGroup((g) => g - 1);
        setCurrentPage((p) => p - 1);
      } else {
        setCurrentPage((p) => p - 1);
      }
    } else {
      if (currentPage % groupCount === 0) {
        setCurrentGroup((g) => g + 1);
        setCurrentPage((p) => p + 1);
      } else {
        setCurrentPage((p) => p + 1);
      }
    }
  };

  console.log("t", totalPage);
  console.log("g", currentGroup);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={currentPage !== 1 ? { ...styles.arrowBtn } : { ...styles.arrowBtn, opacity: 0 }}
        onPress={() => {
          if (currentPage !== 1) {
            handleArrowClick("prev");
          }
        }}
      >
        <AntDesign name="left" size={18} color="black" />
      </TouchableOpacity>
      {/* {Math.min(totalPage - ((currentGroup-1) * groupCount), groupCount)} */}
      {Array.from({ length: Math.min(totalPage - (currentGroup - 1) * groupCount, groupCount) }).map((_, i) => {
        const order = i + 1 + (currentGroup - 1) * groupCount;
        if (currentGroup !== 1) {
        }
        return (
          <TouchableOpacity
            key={order}
            onPress={() => {
              setCurrentPage(order);
            }}
          >
            {currentPage === order ? (
              <LinearGradient colors={["#ff3183", "#fe806a"]} style={{ borderRadius: 20, width: 35, height: 35, justifyContent: "center", alignItems: "center" }}>
                <Text style={currentPage === order ? { color: "#fff", fontWeight: "bold" } : {}}>{order}</Text>
              </LinearGradient>
            ) : (
              <View style={{ backgroundColor: "#ecf2f0", width: 35, height: 35, borderRadius: 18, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgba(0,0,0,0.2)" }}>
                <Text>{order}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={currentPage !== totalPage ? { ...styles.arrowBtn } : { ...styles.arrowBtn, opacity: 0 }}
        onPress={() => {
          if (currentPage !== totalPage) {
            handleArrowClick("next");
          }
        }}
      >
        <AntDesign name="right" size={18} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-end",
  },
  arrowBtn: {
    width: 35,
    height: 35,
    // borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "rgba(0,0,0,0.1)",
  },
});

export default Pagination;
