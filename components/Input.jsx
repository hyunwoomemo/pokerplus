import React, { forwardRef } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import Button from "./Button";
import { Feather } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";

const Label = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  padding: 15px 0 0 0;
  gap: 10px;
`;

const Input = forwardRef(({ style, disableStyle, backgroundColor, ...rest }, ref) => {
  return (
    <View style={style}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
        style={
          disableStyle
            ? { backgroundColor: "#c1c4cb", borderRadius: 30, paddingVertical: 18, paddingHorizontal: 20 }
            : { backgroundColor: `${backgroundColor || "#edf0f7"}`, borderRadius: 30, paddingVertical: 18, paddingHorizontal: 20 }
        }
        ref={ref}
      />
    </View>
  );
});

const DisabledInput = ({ style, value, backgroundColor, ...rest }) => {
  return (
    <View style={style}>
      {value ? (
        <View autoCapitalize="none" autoCorrect={false} {...rest} style={{ backgroundColor: backgroundColor || "#dedfe3", borderRadius: 30, paddingVertical: 18, paddingHorizontal: 20 }}>
          <Text>{value}</Text>
        </View>
      ) : (
        <View autoCapitalize="none" autoCorrect={false} {...rest} style={{ backgroundColor: "#dedfe3", borderRadius: 30, paddingVertical: 18, paddingHorizontal: 20 }} />
      )}
    </View>
  );
};

const withLabel = (Component) => {
  return forwardRef(({ children, require, ...rest }, ref) => {
    return (
      <Container>
        {require ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Label>{children}</Label>
            <Label>
              <Text style={{ color: "#ff3183" }}> (필수)</Text>
            </Label>
          </View>
        ) : (
          <Label>{children}</Label>
        )}

        <Component ref={ref} {...rest} />
      </Container>
    );
  });
};

const withCheckBtn = (Component) => {
  return forwardRef(({ onCheck, loading, success, error, disabled, ...rest }, ref) => {
    return (
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Component {...rest} ref={ref} style={{ flex: 2 }} />
        <Button
          onPress={!success && !error ? onCheck : null}
          disabled={disabled}
          label={loading ? <ActivityIndicator size={17} color="#ff3183" /> : success ? "확인 완료" : "중복 확인"}
          style={{ flex: 1 }}
        />
      </View>
    );
  });
};

const withButton = (Component) => {
  return ({ label, onPress, ...rest }) => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Component {...rest} style={{ flex: 2 }} />
      <Button label={label} onPress={onPress} style={{ flex: 1 }} />
    </View>
  );
};

const withError = (Component) => {
  return forwardRef(({ error, ...rest }, ref) => {
    return (
      <View>
        <Component ref={ref} error={error} {...rest} />
        {error && <Text style={{ color: "tomato", paddingLeft: 10, fontSize: 12, paddingVertical: 10 }}>{error}</Text>}
      </View>
    );
  });
};

const withEng = (Component) => {
  return ({ onChangeFirst, onChangeLast, refFirst, refLast, submitFirst, submitLast, ...rest }) => (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <View style={{ flex: 3 }}>
        <Label style={{ paddingVertical: 10 }}>
          <Text>First name</Text>
        </Label>
        <Component onChangeText={onChangeFirst} ref={refFirst} onSubmitEditing={submitFirst} />
      </View>
      <View style={{ flex: 2 }}>
        <Label style={{ paddingVertical: 10 }}>
          <Text>Last name</Text>
        </Label>
        <Component onChangeText={onChangeLast} ref={refLast} onSubmitEditing={submitLast} />
      </View>
    </View>
  );
};

export const WithLabelInput = withLabel(Input);

export const WithLabelErrorInput = withError(withLabel(Input));

export const WithLabelCheckInput = withLabel(withCheckBtn(Input));

export const WithLabelCheckErrorInput = withError(withLabel(withCheckBtn(Input)));

export const WithEngInput = withError(withLabel(withEng(Input)));

export const WithLabelDisableInput = withLabel(DisabledInput);

export const WithErrorInput = withError(Input);

export const WithButtonLabelInput = withLabel(withButton(Input));

// export const WithSelectInput = withLabel(withSelect());

export default Input;
