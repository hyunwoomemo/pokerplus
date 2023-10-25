import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Pagination = ({ totalPage, currentPage, setCurrentPage }) => {
  const handleArrowClick = (type) => {
    type === "prev" ? setCurrentPage((p) => p - 1) : setCurrentPage((p) => p + 1);
  };
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
      {Array.from({ length: totalPage }).map((_, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setCurrentPage(i + 1);
            }}
          >
            {currentPage === i + 1 ? (
              <LinearGradient colors={["#ff3183", "#fe806a"]} style={{ borderRadius: 20, width: 35, height: 35, justifyContent: "center", alignItems: "center" }}>
                <Text style={currentPage === i + 1 ? { color: "#fff", fontWeight: "bold" } : {}}>{i + 1}</Text>
              </LinearGradient>
            ) : (
              <View style={{ backgroundColor: "#e8f0ee", width: 35, height: 35, borderRadius: 18, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgba(0,0,0,0.2)" }}>
                <Text>{i + 1}</Text>
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
