import { getGrade } from '@/constants/utils';
import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { useCourseStore } from '@/store/courses-store';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React from 'react';
import { View } from 'react-native';
import { GetGradeIcon } from '../getGradeIcon';
import Text from '../text';

const ResultBottomSheet = () => {
  const { bottomSheetRef, activeResultId } = useBottomSheetContext();
  const course = useCourseStore((store) => store.getResultById(activeResultId));

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[1]}
      index={-1}
      enablePanDownToClose
      backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
    >
      <BottomSheetView className="relative p-5 pb-20 pt-9">
        <View className="mb-4">
          <Text className="text-sm">Course Code:</Text>
          <Text className="text-2xl">{course?.course_code}</Text>
        </View>
        <BottomSheetTextInput
          style={{
            marginTop: 8,
            marginBottom: 10,
            borderRadius: 10,
            fontSize: 16,
            lineHeight: 20,
            padding: 8,
            backgroundColor: 'rgba(151, 151, 151, 0.25)',
          }}
        />
        <View className="mb-4">
          <Text className="text-sm">Course Title</Text>
          <Text className="text-2xl">{course?.course_title}</Text>
        </View>
        <View className="mb-4">
          <Text className="text-sm">Units</Text>
          <Text className="text-3xl">{course?.course_units} Units</Text>
        </View>
        <View>
          <Text className="text-sm">Score</Text>
          <Text className="text-4xl">{course?.result}%</Text>
        </View>
        <View className="absolute -right-10 top-0 -z-10">
          <GetGradeIcon grade={getGrade(course?.result || 0)} width={200} height={200} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ResultBottomSheet;
