import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Text, View } from "react-native";
import styled from "styled-components/native";
import CarouselItem from "./CarouselItem";
import { LinearGradient } from "expo-linear-gradient";

const Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Indicator = styled.View`
  margin: 0px 4px;
  background-color: ${(props) => (props.focused ? "#262626" : "#dfdfdf")};
  width: 6px;
  height: 6px;
  border-radius: 3px;
`;

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const ItemTitleWrapper = styled(Animated.createAnimatedComponent(View))`
  /* padding-bottom: 10px; */
  align-items: center;
`;
const ItemTitle = styled.Text`
  padding: 7px 10px;
  text-align: center;
`;

const Carousel = ({ data, pageWidth, gap, offset }) => {
  const [page, setPage] = useState(0);
  const onScroll = (e) => {
    const newPage = Math.abs(Math.round(e.nativeEvent.contentOffset.x / (pageWidth + gap)));
    setPage(newPage);
  };
  const scrollX = useRef(new Animated.Value(0)).current;

  function renderItem(item, index, scrollX) {
    const inputRange = [(index - 1) * pageWidth, index * pageWidth, (index + 1) * pageWidth];

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    });

    const titleOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
    });


    return (
      <Animated.View style={[{ opacity, transform: [{ scale }] }]}>
        <ItemTitleWrapper style={{ opacity: titleOpacity }}>
          <LinearGradient colors={["#bc20a7", "#4c56fa"]} start={{ x: 0.3, y: 0.1 }} style={{ borderRadius: 30, width: "80%" }} end={{ x: 0.9, y: 0.1 }}>
            <View style={{ borderRadius: 30, backgroundColor: "#ebf2f0", marginVertical: 2, marginHorizontal: 2, paddingVertical: 5 }}>
              <ItemTitle>{item.title}</ItemTitle>
            </View>
          </LinearGradient>
        </ItemTitleWrapper>
        <CarouselItem item={item} style={{ width: pageWidth, marginHorizontal: gap / 2, flex: 1 }} />
      </Animated.View>
    );
  }

  return (
    <Container>
      <Animated.FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={data}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item, index) => `page__${item.title}__${index}`}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        // scrollEventThrottle={12}
        pagingEnabled
        renderItem={({ item, index }) => renderItem(item, index, scrollX)}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <IndicatorWrapper>
        {/* {Array.from({ length: pages.length }, (_, i) => i).map((i) => (
          <Indicator key={`indicator_${i}`} focused={i === page} />
        ))} */}
      </IndicatorWrapper>
    </Container>
  );
};

export default Carousel;
