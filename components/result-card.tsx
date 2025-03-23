import { getGrade } from '@/constants/utils';
import { cn } from '@/lib/utils';
import { CourseType, useCourseStore } from '@/store/courses-store';
import { Entypo } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import React, { useRef, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import {
  HexagonLetterA,
  HexagonLetterB,
  HexagonLetterC,
  HexagonLetterD,
  HexagonLetterE,
  HexagonLetterF,
} from './icons';
import Text from './text';

function RightAction({ onPress }: React.ComponentProps<typeof Pressable>) {
  return (
    <Pressable
      className="block h-full w-1/5 items-center justify-center rounded-lg rounded-l-none bg-[#DC3545]"
      onPress={onPress}
    >
      <Feather name="trash-2" size={24} color="#fff" />
    </Pressable>
  );
}

const getGradeIcon = (grade: string) => {
  switch (grade) {
    case 'A':
      return <HexagonLetterA width={32} height={32} fill="#00C853" />;
    case 'B':
      return <HexagonLetterB width={32} height={32} fill="#2196F3" />;
    case 'C':
      return <HexagonLetterC width={32} height={32} fill="#FFC107" />;
    case 'D':
      return <HexagonLetterD width={32} height={32} fill="#FF9800" />;
    case 'E':
      return <HexagonLetterE width={32} height={32} fill="#FF5722" />;
    case 'F':
      return <HexagonLetterF width={32} height={32} fill="#D50000" />;
    default:
      return <Text className="top-1 text-2xl font-medium">{grade}</Text>;
  }
};

export default function ResultCard({ item }: { item: CourseType }) {
  const swipeableRef = useRef<SwipeableMethods | null>(null);
  const { course_title, course_code, course_units, result } = item;
  const [swipedToLeft, setSwipedToLeft] = useState(false);
  const removeCourse = useCourseStore((store) => store.removeCourse);

  const handleDelete = () => {
    Alert.alert(`Are you sure you want to delete ${course_code}?`, 'It will be gone for good', [
      {
        text: 'Yes',
        onPress: () => {
          removeCourse(item.id);
        },
        style: 'destructive',
      },
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => swipeableRef.current?.close(),
      },
    ]);
  };

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        onActivated={() => console.log('Activated')}
        renderRightActions={() => <RightAction onPress={handleDelete} />}
        overshootFriction={8}
        dragOffsetFromRightEdge={40}
        overshootLeft={false}
        onSwipeableWillOpen={(dir) => dir === 'right' && setSwipedToLeft(true)}
        onSwipeableOpen={(dir) => dir === 'right' && setSwipedToLeft(true)}
        onSwipeableClose={(dir) => dir === 'right' && setSwipedToLeft(false)}
        onSwipeableWillClose={(dir) => dir === 'right' && setSwipedToLeft(false)}
      >
        <View
          className={cn(
            'box-border flex-row justify-between border border-[#c5c5c5] bg-white p-4',
            swipedToLeft ? 'rounded-r-none border-r-0' : 'rounded-lg',
          )}
        >
          <View className="flex-1">
            <View className="w-11/12 flex-row items-center gap-2">
              <Text className="text-lg" numberOfLines={1}>
                {course_title}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[#606067]">{course_code}</Text>
              <Entypo name="dot-single" size={24} color="#606067" />
              <Text className="text-[#606067]">
                {course_units} Unit{course_units && course_units > 1 ? 's' : ''}
              </Text>
            </View>
          </View>
          {getGradeIcon(getGrade(result || 0))}
        </View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}
