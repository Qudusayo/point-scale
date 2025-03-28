import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import BottomSheetTextInput from '../bottom-sheet-text-input';
import { CircleCheck } from '../icons';
import Text from '../text';

const GradeSettingsBottomSheet = () => {
  const { gradeSettingsBottomSheetRef, close } = useBottomSheetContext();

  return (
    <BottomSheet
      ref={gradeSettingsBottomSheetRef}
      snapPoints={[1]}
      index={-1}
      enablePanDownToClose
      backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
    >
      <BottomSheetView className="relative gap-5 px-5 pb-12 pt-4">
        <View>
          <Text className="text-2xl">Grade Settings</Text>
          <Text className="text-[#BEC3C9]">Adjust the settings for your grades.</Text>
        </View>

        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text className="mb-1 text-[#606067]">Min Score</Text>
            <BottomSheetTextInput placeholder="e.g. 70" />
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-[#606067]">Max Score</Text>
            <BottomSheetTextInput placeholder="e.g. 100" />
          </View>
        </View>
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text className="mb-1 text-[#606067]">Grade Point</Text>
            <BottomSheetTextInput placeholder="e.g. 5" />
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-[#606067]">Letter</Text>
            <BottomSheetTextInput placeholder="e.g. A" />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {}}
          disabled={false}
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

export default GradeSettingsBottomSheet;
