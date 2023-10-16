import React, { forwardRef, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { TextInput } from "react-native";
import styled from "styled-components/native";

const ErrorText = styled.Text`
  font-size: 12px;
  color: red;
  padding-top: 5px;
  padding-right: 20px;
`;

const mergeRefs = (...refs) => {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
};

const InputField = forwardRef(({ touched, error, value, ...props }, ref) => {
  const innerRef = useRef(null);

  const handlePressInput = () => {
    innerRef.current?.focus();
  };
  return (
    <Pressable onPress={handlePressInput} style={{ width: "95%" }}>
      <View>
        <TextInput autoCapitalize="none" ref={mergeRefs(innerRef, ref)} {...props} autoCorrect={false} spellCheck={false} clearButtonMode="while-editing" />
        {error && value.length > 0 && <ErrorText>{error}</ErrorText>}
      </View>
    </Pressable>
  );
});

export default InputField;
