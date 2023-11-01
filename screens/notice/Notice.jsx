import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { customerApi } from "../../api";
import moment from "moment";
import Pagination from "../../components/Pagination";
import { NoticeContext } from "../../context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { groupCount, offsetValue } from "../../config";
import ScreenLayout from "../../components/ScreenLayout";
import Error from "../../components/Error";

const Notice = ({ navigation }) => {
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalGroup, setTotalGroup] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(1);
  const numberOfItemsPerPageList = [2, 3, 4];

  const flatRef = useRef();

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(["notice", currentPage], () => customerApi.noticeList({ board_id: "notice", offset: offsetValue, page: currentPage }), {
    staleTime: 2000,
    keepPreviousData: true,
  });

  useEffect(() => {
    flatRef?.current?.scrollToOffset({ offset: 0, animated: true });
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["notice", nextPage], () => customerApi.noticeList({ board_id: "notice", offset: offsetValue, page: nextPage }));
    }
  }, [currentPage, queryClient]);

  useEffect(() => {
    if (currentPage === 1) {
      queryClient.prefetchQuery(["notice", 2], () => customerApi.noticeList({ board_id: "notice", offset: offsetValue, page: 2 }));
    }
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(data?.DATA.total / offsetValue));
  }, [data?.DATA.total]);

  if (isError) {
    return <Error />;
  }

  return (
    <ScreenLayout title={"Notice"}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.DATA.data}
        ref={flatRef}
        keyExtractor={(item, index) => index}
        // horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ paddingVertical: 20, gap: 5, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.1)" }}
            onPress={() =>
              navigation.navigate("NoticeDetail", {
                notice: data?.DATA.data,
                index: index,
              })
            }
          >
            <Text style={{ fontSize: 18 }}>{item.subject}</Text>
            <Text style={{ color: "gray" }}>{moment(item.created_at).utc().format("YY/MM/DD")}</Text>
          </TouchableOpacity>
        )}
      />
      {/* )} */}

      {!isLoading && data?.DATA.total > offsetValue && (
        <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 20 }}>
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            groupCount={groupCount}
            totalGroup={totalGroup}
            currentGroup={currentGroup}
            setCurrentGroup={setCurrentGroup}
          />
        </View>
      )}
    </ScreenLayout>
  );
};

export default Notice;
