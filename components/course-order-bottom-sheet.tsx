import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CircleCheck } from './icons';
import Text from './text';

const CourseOrderBottomSheetDisplay = () => {
  const { courseOrderBottomSheetRef, close } = useBottomSheetContext();

  return (
    <BottomSheet
      ref={courseOrderBottomSheetRef}
      snapPoints={[410]}
      index={-1}
      enablePanDownToClose
      backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
    >
      <BottomSheetView className="gap-5 px-5 pt-4">
        <BottomSheetView>
          <Text className="text-2xl">Course Order</Text>
          <Text className="text-[#BEC3C9]">Select the order of your courses.</Text>
        </BottomSheetView>
        <BottomSheetView className="relative gap-4">
          <Selector title="Result" description="Ordered by your results or grades." />
          <Selector title="Course Units" description="Ordered by the number of units they have." />
          <Selector
            title="Course Code"
            description="Ordered alphabetically by their course code."
          />
          <Selector
            title="Default"
            description="Ordered by the sequence in which you added them."
            selected
          />
        </BottomSheetView>
        <TouchableOpacity
          className="rounded-lg bg-primary py-3"
          onPress={() => close('courseOrder')}
          activeOpacity={0.7}
        >
          <Text className="text-center text-lg text-white">Save</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

const Selector = ({
  selected = false,
  title,
  description,
}: {
  selected?: boolean;
  title: string;
  description: string;
}) => {
  return (
    <View className="flex-row items-center gap-3">
      <CircleCheck width={28} height={28} fill={selected ? '#5271FF' : '#BEC3C9'} />
      <View className="">
        <Text className="text-lg">{title}</Text>
        <Text className="-mt-1 text-sm text-[#BEC3C9]">{description}</Text>
      </View>
    </View>
  );
};

export default CourseOrderBottomSheetDisplay;
