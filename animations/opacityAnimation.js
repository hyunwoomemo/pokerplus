import { useRef } from "react";
import { Animated } from "react-native";

export const opacityAnimation = (target, status) => {
  if (status === "start") {
    Animated.loop(
      Animated.sequence([
        Animated.timing(target, {
          toValue: 0.5,
          delay: 300,
          useNativeDriver: true,
        }),
        Animated.timing(target, {
          toValue: 1,
          delay: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  } else {
    Animated.loop(
      Animated.sequence([
        Animated.timing(target, {
          toValue: 0.5,
          delay: 300,
          useNativeDriver: true,
        }),
        Animated.timing(target, {
          toValue: 1,
          delay: 300,
          useNativeDriver: true,
        }),
      ])
    ).reset();
  }
};
