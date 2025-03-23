import { View, Text as RNText } from "react-native";
import Text from "./text";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Entypo } from "@expo/vector-icons";
import { getGrade } from "@/constants/utils";

function RightAction() {
  return (
    <View className="rounded-lg justify-center bg-[#DC3545] items-end pr-4 flex-1 block">
      <Feather name="trash-2" size={24} color="#fff" />
    </View>
  );
}

export default function ResultCard({
  name,
  code,
  unit,
  score,
  grade,
  onSwipeFromLeft,
  onRightPress,
}: {
  name?: string;
  code?: string;
  unit?: number;
  score?: number;
  grade?: string;
  onSwipeFromLeft?: () => void;
  onRightPress?: () => void;
}) {
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        onActivated={() => console.log("Activated")}
        renderRightActions={RightAction}
        onSwipeableOpen={onRightPress}
        dragOffsetFromRightEdge={40}
        overshootLeft={false}
      >
        <View className="bg-white rounded-lg p-4 flex-row justify-between border border-[#c5c5c5]">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 w-11/12">
              <Text className="text-lg" numberOfLines={1}>
                {name}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[#606067]">{code}</Text>
              <Entypo name="dot-single" size={24} color="#606067" />
              <Text className="text-[#606067]">
                {unit} Unit{unit && unit > 1 ? "s" : ""}
              </Text>
            </View>
          </View>
          <Text className="text-2xl top-1 font-medium">
            {getGrade(score || 0)}
          </Text>
        </View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}
