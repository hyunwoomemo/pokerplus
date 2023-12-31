import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, FlatList, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenLayout from "../../components/ScreenLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { pushApi } from "../../api";
import { groupCount, offsetValue } from "../../config";
import { ffect, useFocusEffect } from "@react-navigation/native";
import Pagination from "../../components/Pagination";
import moment from "moment";
import DailyPush from "../../components/DailyPush";
import { ActiveDrawer } from "../../context";
import styled from "styled-components/native";
import { Banner } from "react-native-paper";
import NoItem from "../../components/NoItem";

const PushList = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalGroup, setTotalGroup] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(1);
  const [monthArray, setMonthArray] = useState([]);
  const [dailyData, setDailyData] = useState({});

  const [enableSelect, setEnableSelect] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const [allSelect, setAllSelect] = useState(false);

  const { unread, setUnread } = useContext(ActiveDrawer);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setCurrentPage(1);
        setEnableSelect(false);
      };
    }, [])
  );

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["push", currentPage], () => pushApi.getPushList(offsetValue, currentPage), { keepPreviousData: true });

  useEffect(() => {
    const month = data?.DATA.map((v) => moment(v.created_at).utc().format("YYYY-MM-DD")).filter((v, i, arr) => arr.indexOf(v) === i);
    setMonthArray(month);

    const obj = {};

    month?.forEach((v) => {
      obj[v] = data?.DATA.filter((v1) => v1.created_at.indexOf(v) > -1);
    });

    setDailyData(obj);
  }, [data, currentPage]);

  const flatRef = useRef();

  useEffect(() => {
    setTotalPage(Math.ceil(data?.TOTAL / offsetValue));
  }, [data]);

  useEffect(() => {
    if (currentPage === 1) {
      queryClient.prefetchQuery(["push", 1], () => pushApi.getPushList(offsetValue, 1));
    }
  });

  useEffect(() => {
    flatRef?.current?.scrollToOffset({ offset: 0, animated: true });
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["push", nextPage], () => pushApi.getPushList(offsetValue, nextPage));
    }
  }, [currentPage, queryClient]);

  const Separator = () => {
    return <View style={{ borderWidth: 1, borderColor: "#ececec" }}></View>;
  };

  const topValue = useRef(new Animated.Value(-200)).current;

  const handleEnableSelect = () => {
    setEnableSelect(!enableSelect);

    if (!enableSelect) {
      Animated.timing(topValue, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).start();
    } else {
      Animated.timing(topValue, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).reset();
    }
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }, [enableSelect]);

  const handleRead = async () => {
    try {
      const res = await pushApi.read(0);
      queryClient.invalidateQueries(["push"]);
      queryClient.invalidateQueries(["pushUnRead"]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await pushApi.delete(0);
      queryClient.invalidateQueries(["push"]);
      queryClient.invalidateQueries(["pushUnRead"]);
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const Side = () => {
    return (
      <View style={{ marginLeft: "auto", paddingHorizontal: Platform.OS === "android" && 30, flexDirection: "row", alignItems: "center", gap: 15 }}>
        {/* <TouchableOpacity>
          <StyledText>읽음</StyledText>
        </TouchableOpacity>
        <TouchableOpacity>
          <StyledText>삭제</StyledText>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleEnableSelect}>
          <StyledText>옵션</StyledText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScreenLayout title={"푸시 알림 내역"}>
      {isLoading ? (
        <ActivityIndicator style={StyleSheet.absoluteFillObject} color="#ff3183" size="large" />
      ) : (
        <>
          <View
            style={{
              padding: 20,
              zIndex: 2,
              // backgroundColor: "#fff",
              marginBottom: 20,
              flexDirection: "row",
              // justifyContent: "space-between",
              gap: 30,
              marginLeft: "auto",
              borderRadius: 10,
            }}
          >
            <TouchableOpacity onPress={handleRead}>
              <StyledText>모두 읽기</StyledText>
            </TouchableOpacity>
            {/* <Text>•</Text> */}
            <TouchableOpacity onPress={handleDelete}>
              <StyledText>모두 삭제</StyledText>
            </TouchableOpacity>
          </View>

          {data?.DATA?.length ? (
            <>
              <View style={styles.container}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  ref={flatRef}
                  ItemSeparatorComponent={<Separator />}
                  data={monthArray}
                  keyExtractor={(item, index) => `${index}`}
                  renderItem={({ item }) => (
                    <DailyPush selectedItem={selectedItem} setSelectedItem={setSelectedItem} enableSelect={enableSelect} item={item} currentPage={currentPage} dailyData={dailyData} />
                  )}
                />
              </View>
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
            </>
          ) : (
            <NoItem text="전송 내역이 존재하지 않습니다." />
          )}
        </>
      )}
    </ScreenLayout>
  );
};

const StyledText = styled.Text`
  font-size: 16px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PushList;
