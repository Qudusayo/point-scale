import { View, Pressable, LayoutAnimation, Alert } from "react-native";
import Text from "./text";
import Feather from "@expo/vector-icons/Feather";
import React, { LegacyRef, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { Entypo } from "@expo/vector-icons";
import { getGrade } from "@/constants/utils";
import { CourseType, useCourseStore } from "@/store/courses-store";
import { cn } from "@/lib/utils";

function RightAction({ onPress }: React.ComponentProps<typeof Pressable>) {
  return (
    <Pressable
      className="rounded-lg justify-center rounded-l-none bg-[#DC3545] items-center block w-1/5 h-full"
      onPress={onPress}
    >
      <Feather name="trash-2" size={24} color="#fff" />
    </Pressable>
  );
}

export default function ResultCard({ item }: { item: CourseType }) {
  const swipeableRef = useRef<SwipeableMethods | null>(null);
  const { course_title, course_code, course_units, result } = item;
  const [swipedToLeft, setSwipedToLeft] = useState(false);
  const removeCourse = useCourseStore((store) => store.removeCourse);

  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${course_code}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => {
            removeCourse(item.id);
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => swipeableRef.current?.close(),
        },
      ]
    );
  };

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        onActivated={() => console.log("Activated")}
        renderRightActions={() => <RightAction onPress={handleDelete} />}
        overshootFriction={8}
        dragOffsetFromRightEdge={40}
        overshootLeft={false}
        onSwipeableWillOpen={(dir) => dir === "right" && setSwipedToLeft(true)}
        onSwipeableOpen={(dir) => dir === "right" && setSwipedToLeft(true)}
        onSwipeableClose={(dir) => dir === "right" && setSwipedToLeft(false)}
        onSwipeableWillClose={(dir) =>
          dir === "right" && setSwipedToLeft(false)
        }
      >
        <View
          className={cn(
            "bg-white p-4 flex-row justify-between border border-[#c5c5c5] box-border",
            swipedToLeft ? "rounded-r-none border-r-0" : "rounded-lg"
          )}
        >
          <View className="flex-1">
            <View className="flex-row items-center gap-2 w-11/12">
              <Text className="text-lg" numberOfLines={1}>
                {course_title}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[#606067]">{course_code}</Text>
              <Entypo name="dot-single" size={24} color="#606067" />
              <Text className="text-[#606067]">
                {course_units} Unit{course_units && course_units > 1 ? "s" : ""}
              </Text>
            </View>
          </View>
          <Text className="text-2xl top-1 font-medium">
            {getGrade(result || 0)}
          </Text>
        </View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}
