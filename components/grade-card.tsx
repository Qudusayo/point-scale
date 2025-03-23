import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View } from 'react-native';
import Text from './text';

const GradeCard = () => {
  return (
    <View className="gap-4 rounded-lg border border-[#c5c5c5] bg-white p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-semibold">Grade A+</Text>
        <FontAwesome6 name="pencil" size={20} color="#606067" />
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-md text-lg font-medium text-[#606067]">Grade Point</Text>
        <Text className="text-lg">4.0</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-md text-lg font-medium text-[#606067]">Score Range</Text>
        <Text className="text-lg">90 - 100</Text>
      </View>
    </View>
  );
};

export default GradeCard;
