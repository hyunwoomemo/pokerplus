import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  backbtn: {
    // paddingVertical: 20,
  },
  titleBackbtn: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
});

const BackBtn = ({ onPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.backbtn}>
      <TouchableOpacity onPress={onPress ? onPress : navigation.goBack}>
        <Ionicons name="chevron-back-outline" size={48} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const withTitle = (Component) => {
  return ({ title, subTitle, ...rest }) => {
    return (
      <View style={styles.titleBackbtn}>
        <Component {...rest} />
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center", flex: 1 }}>{title}</Text>
          {subTitle && <Text style={{ color: "gray" }}>{subTitle}</Text>}
        </View>
      </View>
    );
  };
};

export const WithTitleBackBtn = withTitle(BackBtn);
// export const WithSubTitleBackBtn = withSubTitle(withTitle(BackBtn));

export default BackBtn;
