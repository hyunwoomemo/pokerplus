import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, LayoutAnimation, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Layout from "../components/Layout";
import { customerApi } from "../api";
import { SelectList } from "react-native-dropdown-select-list";
import { WithLabelInput } from "../components/Input";
import Button from "../components/Button";
import AppBar from "../components/AppBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ModalComponent from "../components/Modal";
import { useFocusEffect } from "@react-navigation/native";
import ScreenLayout from "../components/ScreenLayout";

const Qna = ({ navigation }) => {
  const [config, setConfig] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState();

  const hideModal = () => {
    setVisible(false);
  };

  const queryClient = useQueryClient();
  const scrollRef = useRef();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSelectedConfig();
        setValues({});
        scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
      };
    }, [])
  );

  const { data, isLoading } = useQuery(["customerConfig"], customerApi.customerConfig);

  useEffect(() => {
    setConfig(data?.DATA.hosts);
  }, [data]);

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
        queryClient.invalidateQueries(["qna"]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const Separator = () => {
    return <View style={{ borderBottomWidth: 1, borderColor: "#ececec" }} />;
  };

  const Header = () => {
    return (
      <View style={{ paddingBottom: 20, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 18, color: "gray" }}>문의 대상을 선택해주세요</Text>
      </View>
    );
  };

  const handleSelect = (item) => {
    setVisible(false);
    setSelectedConfig(item);
    console.log(item);
    setValues({
      ...values,
      host_id: item.host_id,
    });
  };

  const submitDisabled = !(selectedConfig && Object.keys(selectedConfig).length && values.subject && values.contents);

  return (
    <ScreenLayout title={"1:1 문의하기"}>
      <ScrollView style={{ marginTop: 20 }} ref={scrollRef}>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            marginVertical: 20,
            backgroundColor: "#fff",
            borderRadius: 50,
            paddingVertical: 18,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>{selectedConfig && Object.keys(selectedConfig).length ? `${selectedConfig?.company_name}` : "문의 대상을 선택해주세요"}</Text>
        </TouchableOpacity>
        <ModalComponent visible={visible} hideModal={hideModal}>
          <FlatList
            data={config}
            keyExtractor={(item, index) => `${index}-${item.ticket_info_id}`}
            ItemSeparatorComponent={<Separator />}
            ListHeaderComponent={<Header />}
            stickyHeaderIndices={[0]}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)} style={{ alignItems: "center", padding: 20 }}>
                <Text style={{ fontSize: 16 }}>{item.company_name}</Text>
              </TouchableOpacity>
            )}
          />
        </ModalComponent>
        <WithLabelInput onChangeText={(text) => handleChange("subject", text)} backgroundColor="#fff" value={values.subject}>
          <Text style={{ fontSize: 16 }}>제목</Text>
        </WithLabelInput>
        <View style={styles.textAreaWrapper}>
          <Text style={{ fontSize: 16 }}>문의 내용 입력 (200자 내외)</Text>
          <TextInput
            value={values.contents}
            onChangeText={(text) => handleChange("contents", text)}
            multiline={true}
            maxLength={200}
            style={{ ...styles.textArea }}
            numberOfLines={10}
            placeholderTextColor={"gray"}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button label="취소" dark style={{ flex: 1 }} onPress={() => navigation.goBack()} />
          <Button label="전송" disabled={submitDisabled} loading={loading} onPress={handleSubmit} primary style={{ flex: 1 }} />
        </View>
      </ScrollView>
    </ScreenLayout>
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
    fontSize: 16,
    paddingVertical: 40,
    paddingTop: 20,
    height: 100,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 20,
  },
});

export default Qna;
