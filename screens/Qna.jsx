import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Layout from "../components/Layout";
import { customerApi } from "../api";
import { SelectList } from "react-native-dropdown-select-list";
import { WithLabelInput } from "../components/Input";
import Button from "../components/Button";

const Qna = ({ navigation }) => {
  const [config, setConfig] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  navigation.addListener("blur", () => {
    setValues({});
  });

  useEffect(() => {
    if (config.length === 0) {
      customerApi.customerConfig().then((res) => {
        res.DATA.hosts.forEach((item) => {
          setConfig((prev) => [...prev, { key: item.host_id, value: item.company_name }]);
        });
      });
    }
  }, []);

  const handleChange = (type, value) => {
    setValues({
      ...values,
      [type]: value,
    });
  };


  const handleSubmit = async () => {
    setLoading(true);
    const { host_id, subject, contents } = values;
    try {
      const res = await customerApi.updateCustomerItem(0, host_id, subject, contents);
      if (res.CODE === "DU000") {
        navigation.navigate("QnaNav", { data: res.DATA });
        setValues({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Text style={styles.title}>1:1 문의하기</Text>
      <ScrollView style={{ paddingHorizontal: 32, marginTop: 20 }}>
        <SelectList
          boxStyles={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 15, paddingVertical: 18, paddingHorizontal: 20, borderColor: "transparent" }}
          dropdownStyles={{ backgroundColor: "#fff", borderWidth: 0 }}
          dropdownItemStyles={{ paddingVertical: 10 }}
          setSelected={(val) => handleChange("host_id", val)}
          data={config}
          save="key"
          placeholder="문의 대상을 선택하세요."
          defaultOption={{ key: "", value: "" }}
        />
        <WithLabelInput onChangeText={(text) => handleChange("subject", text)} backgroundColor="#fff" placeholder="문의 제목을 입력하세요." placeholderTextColor="gray" value={values.subject}>
          <Text>제목</Text>
        </WithLabelInput>
        <View style={styles.textAreaWrapper}>
          <Text>문의 내용</Text>
          <TextInput
            value={values.contents}
            onChangeText={(text) => handleChange("contents", text)}
            multiline={true}
            maxLength={200}
            style={styles.textArea}
            numberOfLines={10}
            placeholder="200자 내외로 입력하세요."
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button label="취소" dark style={{ flex: 1 }} onPress={() => navigation.goBack()} />
          <Button label="전송" loading={loading} onPress={handleSubmit} primary style={{ flex: 1 }} />
        </View>
      </ScrollView>
    </Layout>
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
  textAreaWrapper: {
    paddingVertical: 20,
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginTop: 20,
    paddingHorizontal: 20,
    // fontSize: 16,
    paddingVertical: 40,
    paddingTop: 20,
    height: 100,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
  },
});

export default Qna;
