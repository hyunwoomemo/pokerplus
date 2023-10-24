import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Layout from "../components/Layout";
import Title from "../components/Title";
import { MaterialIcons } from "@expo/vector-icons";
import { customerApi } from "../api";
import { toggleAnimation } from "../animations/toggleAnimation";
import Pagination from "../components/Pagination";
import { useFocusEffect } from "@react-navigation/native";
import AppBar from "../components/AppBar";

const AccordionWrapper = ({ title, children, data, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  useFocusEffect(
    useCallback(() => {
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
        delay: 300 + index * 100,
      }).start();
      return () => {
        Animated.spring(opacity, {
          toValue: 1,
          useNativeDriver: true,
          delay: 300 + index * 100,
        }).reset();
      };
    }, [])
  );

  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: isOpen ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setIsOpen(!isOpen);
  };

  const rotate = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Animated.View style={{ overflow: "hidden", opacity, transform: [{ scale }] }}>
      <TouchableOpacity onPress={toggleListItem} style={styles.wrapper}>
        <View style={styles.accordionItem}>
          <Text style={styles.accordionItemTitle}>{title}</Text>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={isOpen ? "#ff3183" : "black"} />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {isOpen && <AccordionItem isOpen={isOpen} content={data} />}
    </Animated.View>
  );
};

const AccordionItem = ({ content, isOpen, name }) => {
  return (
    <Animated.View style={styles.accordionItemContents}>
      <TouchableOpacity>
        <Text style={isOpen ? { color: "#ff3183", lineHeight: 24 } : {}}>{content}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Faq = () => {
  const [faq, setFaq] = useState();
  const [offset, setOffset] = useState(10);
  const [total, setTotal] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    customerApi.faqList(offset, currentPage).then((res) => {
      if (res.CODE === "DFL000") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setTotal(res.DATA.total);
        setFaq(res.DATA.data);
        // setTotalPage()
      }
    });
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(total / offset));
  }, [total]);

  useEffect(() => {
    customerApi.faqList(offset, currentPage).then((res) => {
      if (res.CODE === "DFL000") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setTotal(res.DATA.total);
        setFaq(res.DATA.data);
        // setTotalPage()
      }
    });
  }, [totalPage]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="FAQ" />
      <FlatList data={faq} keyExtractor={(item) => item.contents} renderItem={({ item, index }) => <AccordionWrapper title={item.subject} data={item.contents} index={index} />} />
      {/* <ScrollView>
        {faq &&
          faq.map((item, index) => {
            return <AccordionWrapper key={index} title={item.subject} data={item.contents} />;
          })}
        <AccordionWrapper title="Q. 로그아웃과 회원탈퇴는 어떻게 하나요?" data="A. 로그아웃은 사이드바 하단에 있으며, 회원탈퇴는 정보 수정 탭의 하단에 회원 탈퇴를 이용해주시면 됩니다." />
      </ScrollView> */}

      <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 10 }}>
        {totalPage > 1 && <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 20,
  },
  wrapper: {
    paddingHorizontal: 32,
  },
  accordionItemTitle: {
    fontSize: 16,
  },
  accordionItem: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0, 0.2)",
  },
  accordionItemContents: {
    marginHorizontal: 32,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0, 0.2)",
    backgroundColor: "#fff",
    // color: isOpen ? "##ff3183" : undefined,
  },
});

export default Faq;
