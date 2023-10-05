import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const BackBtn = ({onPress}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={onPress ? onPress : navigation.goBack} >
      <Ionicons name="chevron-back-outline" size={48} color="black" />
    </TouchableOpacity>
  );
};

export default BackBtn;
