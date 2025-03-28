import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { CoursesOrder, useCourseStore } from '@/store/courses-store';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { CircleCheck } from '../icons';
import Text from '../text';

const CourseOrderBottomSheet = () => {
  const { courseOrderBottomSheetRef, close } = useBottomSheetContext();
  const { courseOrder, setCourseOrder } = useCourseStore((store) => store);

  const [selectedOrder, setSelectedOrder] = useState<CoursesOrder>(courseOrder);

  const handleOrderSelect = (order: CoursesOrder) => {
    setSelectedOrder(order);
  };

  const handleSave = () => {
    setCourseOrder(selectedOrder);
    close('courseOrder');
  };

  return (
    <BottomSheet
      ref={courseOrderBottomSheetRef}
      snapPoints={[1]}
      index={-1}
      enablePanDownToClose
      backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
    >
      <BottomSheetView className="relative gap-5 px-5 pb-12 pt-4">
        <View>
          <Text className="text-2xl">Course Order</Text>
          <Text className="text-[#BEC3C9]">Select the order of your courses.</Text>
        </View>
        <View className="relative gap-4">
          <Selector
            title="Result"
            description="Ordered by your results or grades."
            selected={selectedOrder === 'result'}
            onPress={() => handleOrderSelect('result')}
          />
          <Selector
            title="Course Units"
            description="Ordered by the number of units they have."
            selected={selectedOrder === 'course_units'}
            onPress={() => handleOrderSelect('course_units')}
          />
          <Selector
            title="Course Code"
            description="Ordered alphabetically by their course code."
            selected={selectedOrder === 'course_code'}
            onPress={() => handleOrderSelect('course_code')}
          />
          <Selector
            title="Default"
            description="Ordered by the sequence in which you added them."
            selected={selectedOrder === 'default'}
            onPress={() => handleOrderSelect('default')}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleSave()}
          disabled={courseOrder === selectedOrder}
          className="mt-6 rounded-lg bg-primary py-3 disabled:opacity-50"
        >
          <Text className="text-center text-lg text-white">Save</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

interface SelectorProps extends React.ComponentProps<typeof Pressable> {
  selected?: boolean;
  title: string;
  description: string;
}

const Selector = ({ selected = false, title, description, onPress }: SelectorProps) => {
  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center gap-3">
        <CircleCheck width={28} height={28} fill={selected ? '#5271FF' : '#BEC3C9'} />
        <View className="">
          <Text className="text-lg">{title}</Text>
          <Text className="-mt-1 text-sm text-[#BEC3C9]">{description}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CourseOrderBottomSheet;
