import React, { createContext, forwardRef, useContext, useRef, useState } from "react";
import Layout from "../../components/Layout";
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../../components/ScreenLayout";
import { global } from "../../globalStyle";
import Button from "../../components/Button";
import { validateJoin } from "../../utils/validate";
import InputField from "../../components/InputField";
import debounce from "../../utils/debounce";
import { authApi } from "../../api";

const JoinContext = createContext();

// useContext custom hook
const useJoin = () => {
  const context = useContext(JoinContext);
  if (!context) throw new Error("Join 컴포넌트 안에서만 사용할 수 있습니다.");

  return context;
};

// Style Component

// Main Code

const Container = styled.ScrollView`
  padding: 20px;
  background-color: #fff;
  flex: 1;
`;

export const Join = ({ children }) => {
  const [values, setValues] = useState({});
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  const providerValue = { open, setOpen, values, setValues, error, setError };

  return (
    <Container>
      <JoinContext.Provider value={providerValue}>{children}</JoinContext.Provider>
    </Container>
  );
};

const Profile = ({ uri, width, height, borderRadius, resizeMode, ...props }) => {
  const { open, setOpen } = useJoin();

  const handlePress = () => {
    setOpen(!open);
    console.log(open);
    // console.log("이미지 업로드 구현 예정");
    // console.log(uri);dlgu
  };

  return (
    <TouchableOpacity {...props} onPress={handlePress}>
      <Image
        source={{
          uri: uri,
        }}
        width={width}
        height={height}
        style={{ borderRadius }}
        resizeMode={resizeMode}
      />
    </TouchableOpacity>
  );
};

const Noti = ({ children, ...props }) => {
  return <Text {...props}>{children}</Text>;
};

const InputWrapper = ({ children, gap, style }) => {
  if (children.length === 3) {
    return (
      <View style={{ gap }}>
        {children[0]}
        <View style={style}>
          {children[1]}
          {children[2]}
        </View>
      </View>
    );
  } else {
    return <View style={{ gap }}>{children}</View>;
  }
};

const Label = ({ name, required, style, fontSize, target }) => {
  const focus = () => {
    if (!target) return;
    target.current?.focus();
  };
  return (
    <Pressable style={style} onPress={focus}>
      <Text style={{ fontSize }}>{name}</Text>
      {required && <Text style={{ color: global.pink, fontSize }}> (필수)</Text>}
    </Pressable>
  );
};

const Input = forwardRef(({ style, placeholder, disabled, name }, ref) => {
  const { values, setValues, error, setError } = useJoin();

  console.log(values);
  const handleChangeText = (name, text) => {
    setValues({
      ...values,
      [name]: text,
    });

    validateJoin(name, text, values, error, setError);
  };

  return (
    <View style={style}>
      <InputField
        ref={ref}
        // clearButtonMode="while-editing"
        // // value={values[name]}
        // onChangeText={(text) => handleChangeText(name, text)}
        // blurOnSubmit={false}
        onChangeText={(text) => handleChangeText(name, text)}
        selectTextOnFocus={!disabled}
        editable={!disabled}
        placeholder={placeholder}
        autoCapitalize="none"
        error={error[name]}
        value={values[name]}
        // style={}
        // onSubmitEditing={() => console.log("submit")}
      />
      {/* {error[name] && values[name].length > 0 && <Error name={name} style={{ fontSize: 12, color: "red", paddingTop: 5, paddingRight: 20, height: 60 }} />} */}
    </View>
  );
});

const Error = ({ name, style }) => {
  const { error } = useJoin();
  if (!error[name]) return;
  return <Text style={style}>{error[name]}</Text>;
};

const EmailCheck = ({ style, text }) => {
  const { values } = useJoin();

  console.log(values);
  const handleValidate = async () => {
    console.log(values.email);
    try {
      const res = await authApi.validate("id", { value: values.email });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TouchableOpacity style={style} onPress={handleValidate}>
      <Text style={{ color: "white", fontSize: 16, fontWeight: 900 }}>{text}</Text>
    </TouchableOpacity>
  );
};

const NickCheck = ({ style, text }) => {
  const { values } = useJoin();

  const handleValidate = async () => {
    try {
      const res = await authApi.validate("nick", values.nick);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TouchableOpacity style={style} onPress={handleValidate}>
      <Text style={{ color: "white", fontSize: 16, fontWeight: 900 }}>{text}</Text>
    </TouchableOpacity>
  );
};

const EngFirst = forwardRef(({ labelStyle, inputStyle, placeholder, name }, ref) => {
  const { error, setError, values, setValues } = useJoin();

  const handleChangeText = debounce((name, text) => {
    setValues({
      ...values,
      [name]: text,
    });

    validateJoin(name, text, values, error, setError);
  });

  return (
    <View style={{ flex: 2 }}>
      <Pressable>
        <Text style={labelStyle}>이름(First name)</Text>
      </Pressable>
      <View style={inputStyle}>
        <InputField
          ref={ref}
          // clearButtonMode="while-editing"
          // // value={values[name]}
          // onChangeText={(text) => handleChangeText(name, text)}
          // blurOnSubmit={false}
          onChangeText={(text) => handleChangeText(name, text)}
          placeholder={placeholder}
          autoCapitalize="none"
          error={error[name]}
          value={values[name]}
          // style={}
          // onSubmitEditing={() => console.log("submit")}
        />
      </View>
    </View>
  );
});

const EngLast = forwardRef(({ labelStyle, inputStyle, placeholder, name }, ref) => {
  const { error, setError, values, setValues } = useJoin();

  const handleChangeText = debounce((name, text) => {
    setValues({
      ...values,
      [name]: text,
    });

    validateJoin(name, text, values, error, setError);
  });
  return (
    <View style={{ flex: 1 }}>
      <Pressable>
        <Text style={labelStyle}>성(Last name)</Text>
      </Pressable>
      <View style={inputStyle}>
        <InputField ref={ref} onChangeText={(text) => handleChangeText(name, text)} placeholder={placeholder} autoCapitalize="none" error={error[name]} value={values[name]} />
      </View>
    </View>
  );
});

const ButtonWrapper = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};

const Cancel = () => {
  return <Button style={{ flex: 1 }} label="취소" onPress={() => console.log("취소")} />;
};

const Submit = () => {
  return <Button style={{ flex: 1 }} label="가입하기" primary></Button>;
};

Join.Profile = Profile;
Join.Noti = Noti;
Join.InputWrapper = InputWrapper;
Join.Label = Label;
Join.Input = Input;
Join.Error = Error;
Join.EmailCheck = EmailCheck;
Join.NickCheck = NickCheck;
Join.EngFirst = EngFirst;
Join.EngLast = EngLast;
Join.ButtonWrapper = ButtonWrapper;
Join.Cancel = Cancel;
Join.Submit = Submit;
