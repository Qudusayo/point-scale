import { View, Text } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const GradeCard = () => {
  return (
    <View className="bg-white border border-[#c5c5c5] rounded-lg p-4 gap-4">
      <View className="flex-row justify-between items-center">
        <Text className="font-semibold text-xl">Grade A+</Text>
        <FontAwesome6 name="pencil" size={20} color="#606067" />
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-md font-medium text-[#606067] text-lg">
          Grade Point
        </Text>
        <Text className="text-lg">4.0</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-md font-medium text-[#606067] text-lg">
          Score Range
        </Text>
        <Text className="text-lg">90 - 100</Text>
      </View>
    </View>
  );
};

export default GradeCard;
