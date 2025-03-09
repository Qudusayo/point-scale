import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { cn } from "@/lib/utils";
import Entypo from "@expo/vector-icons/Entypo";

export default function HomeScreen() {
  return (
    <View>
      <View className="bg-white ">
        <SafeAreaView className="w-11/12 mx-auto gap-8 pt-8">
          <View className="items-center gap-2">
            <Text>Current CGPA</Text>
            <Text className="text-6xl font-semibold">4.00</Text>
          </View>
          <View className="flex-row gap-4">
            <DetailsCard title="Credits" value="96" />
            <DetailsCard title="Courses" value="32" />
            <DetailsCard title="Term" value="8th" />
          </View>

          <View className="flex-row gap-2">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="iflex-row items-center gap-3"
            >
              <Selector title="300L 2nd Semester" active />
              <Selector title="300L 1st Semester" />
            </ScrollView>
            <Pressable hitSlop={8} className="rounded-lg bg-primary p-2">
              <AntDesign name="plus" size={24} color="#fff" />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
      <View className="w-11/12 mx-auto gap-4 pt-6">
        <View className="flex-row justify-between mb-6">
          <View>
            <View className="flex-row items-center gap-2">
              <Text className="text-lg">300L 2nd Semester</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[#606067]">Current CGPA: 3.84</Text>
            </View>
          </View>
          <Pressable
            hitSlop={8}
            className="rounded-lg bg-primary py-2 px-4 flex-row items-center gap-2"
          >
            <AntDesign name="plus" size={20} color="#fff" />
            <Text className="text-white">Add Course</Text>
          </Pressable>
        </View>
        <ResultCard />
        <ResultCard />
      </View>
    </View>
  );
}

const ResultCard = () => (
  <View className="bg-white rounded-lg p-4 flex-row justify-between border border-[#c5c5c5]">
    <View>
      <View className="flex-row items-center gap-2">
        <Text className="text-lg">Software Engineering</Text>
      </View>
      <View className="flex-row items-center">
        <Text className="text-[#606067]">CSC 301</Text>
        <Entypo name="dot-single" size={24} color="#606067" />
        <Text className="text-[#606067]">3 Unit</Text>
      </View>
    </View>
    <Text className="text-2xl top-1 font-medium">A</Text>
  </View>
);

const Selector = ({ title, active }: { title: string; active?: boolean }) => (
  <Pressable
    className={cn(
      "bg-primary/20 items-center justify-center rounded-lg px-5 py-3",
      active && "bg-primary"
    )}
  >
    <Text className="text-white">{title}</Text>
  </Pressable>
);

const DetailsCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <View className="flex-1 bg-[#f3f4f6] rounded-lg items-center gap-1 p-4">
      <Text className="text-[#606067]">{title}</Text>
      <Text className="font-semibold text-xl">{value}</Text>
    </View>
  );
};
