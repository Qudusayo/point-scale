import { getGrade } from '@/constants/utils';
import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { cn } from '@/lib/utils';
import { CourseType, useCourseStore } from '@/store/courses-store';
import { Entypo } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import React, { useRef, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GetGradeIcon } from './getGradeIcon';
import { Pencil } from './icons';
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

function LeftAction({ onPress }: React.ComponentProps<typeof Pressable>) {
  return (
    <Pressable
      className="block h-full w-1/5 items-center justify-center rounded-lg rounded-r-none bg-[#5271FF]"
      onPress={onPress}
    >
      <Pencil stroke="#fff" />
    </Pressable>
  );
}

export default function ResultCard({ item }: { item: CourseType }) {
  const swipeableRef = useRef<SwipeableMethods | null>(null);
  const { course_title, course_code, course_units, result } = item;
  const [swipedToLeft, setSwipedToLeft] = useState(false);
  const [swipedToRight, setSwipedToRight] = useState(false);
  const removeCourse = useCourseStore((store) => store.removeCourse);
  const { bottomSheetRef, setActiveResultId } = useBottomSheetContext();

  const openBottomSheet = () => {
    setActiveResultId(item.id);
    bottomSheetRef.current?.snapToIndex(1);
  };

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

  const openHandlerCallback = (dir: 'left' | 'right') =>
    dir === 'right' ? setSwipedToLeft(true) : setSwipedToRight(true);

  const closeHandlerCallback = (dir: 'left' | 'right') =>
    dir === 'right' ? setSwipedToLeft(false) : setSwipedToRight(false);

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      onActivated={() => console.log('Activated')}
      renderRightActions={() => <RightAction onPress={handleDelete} />}
      renderLeftActions={() => <LeftAction onPress={() => console.log('Edit pressed')} />}
      overshootFriction={8}
      dragOffsetFromRightEdge={40}
      overshootLeft={false}
      onSwipeableWillOpen={openHandlerCallback}
      onSwipeableOpen={openHandlerCallback}
      onSwipeableClose={closeHandlerCallback}
      onSwipeableWillClose={closeHandlerCallback}
    >
      <Pressable
        onPress={openBottomSheet}
        className={cn(
          'box-border flex-row justify-between border border-[#c5c5c5] bg-white p-4',
          swipedToLeft ? '!rounded-r-none border-r-0' : 'rounded-lg',
          swipedToRight ? '!rounded-l-none border-l-0' : 'rounded-lg',
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
        <GetGradeIcon grade={getGrade(result || 0)} />
      </Pressable>
    </ReanimatedSwipeable>
  );
}
