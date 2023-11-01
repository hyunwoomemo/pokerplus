import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toggleAnimation } from "../../animations/toggleAnimation";
import { customerApi } from "../../api";
import { groupCount, offsetValue } from "../../config";
import ScreenLayout from "../../components/ScreenLayout";
import Error from "../../components/Error";

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
        delay: 100 + index * 100,
      }).start();
      return () => {
        Animated.spring(opacity, {
          toValue: 1,
          useNativeDriver: true,
          delay: 100 + index * 100,
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
          <Animated.View style={{ transform: [{ rotate }], alignSelf: "flex-start" }}>
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
  const [total, setTotal] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalGroup, setTotalGroup] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(1);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(["faq", currentPage], () => customerApi.faqList(offsetValue, currentPage));

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(["faq"]);
    }, [])
  );

  useEffect(() => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["faq", nextPage], () => customerApi.faqList(offset, nextPage));
    }
  }, [currentPage, queryClient]);

  useEffect(() => {
    setTotalPage(Math.ceil(total / offsetValue));
  }, [total]);

  if (isError) {
    return <Error />;
  }

  return (
    <ScreenLayout title={"FAQ"}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.DATA.data}
        keyExtractor={(item) => item.contents}
        renderItem={({ item, index }) => <AccordionWrapper title={item.subject} data={item.contents} index={index} />}
      />

      <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 10 }}>
        {totalPage > 1 && (
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            groupCount={groupCount}
            totalGroup={totalGroup}
            currentGroup={currentGroup}
            setCurrentGroup={setCurrentGroup}
          />
        )}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 20,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  accordionItemTitle: {
    fontSize: 16,
    width: "90%",
    lineHeight: 24,
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
    marginHorizontal: 20,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0, 0.2)",
    backgroundColor: "#fff",
    // color: isOpen ? "##ff3183" : undefined,
  },
});

export default Faq;
