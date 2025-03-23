import {
  Pressable,
  ScrollView,
  View,
  FlatList,
  Alert,
  PressableProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Text from "@/components/text";
import { Link } from "expo-router";
import ResultList from "@/components/result-list";
import { calculateCGPA, CourseDetails } from "@/constants/utils";
import SessionTabs from "@/components/session-tabs";
import { useCourseStore } from "@/store/courses-store";
import { useSemesterStore } from "@/store/semester-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const courses = useCourseStore((store) => store.courses);
  const semesters = useSemesterStore((store) => store.semesters);
  const [totalCGPA, setTotalCGPA] = useState(0);
  const [activeSemesterId, setActiveSemesterId] = useState<string | null>(null);
  const [totalWGPA, setTotalWGPA] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [unitsPassed, setUnitsPassed] = useState(0);

  const calculateTotalCGPA = () => {
    const cgpa = calculateCGPA(courses);
    setTotalUnits(cgpa[0] || 0);
    setUnitsPassed(cgpa[1] || 0);
    setTotalWGPA(cgpa[2] || 0);
    setTotalCGPA(cgpa[3] || 0);
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared!");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  useEffect(() => {
    // clearStorage();   // For testing purposes only
    calculateTotalCGPA();
    setActiveSemesterId(semesters[0]?.id || null);
  }, []);

  useEffect(() => {
    if (!activeSemesterId) {
      setActiveSemesterId(semesters[0]?.id || null);
    }
  }, [semesters]);

  useEffect(() => {
    calculateTotalCGPA();
  }, [courses]);

  return (
    <View className="flex-1">
      <View className="flex-1">
        <View className="bg-white">
          <SafeAreaView
            className="w-11/12 mx-auto py-8 gap-8"
            edges={["top", "left", "right"]}
          >
            <View className="items-center gap-2">
              <Text>Current CGPA</Text>
              <Text className="text-7xl font-semibold font-system text-primary">
                {totalCGPA.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row gap-4">
              <DetailsCard title="Units Reg." value={totalUnits + ""} />
              <DetailsCard title="Units Passed" value={unitsPassed + ""} />
              <DetailsCard title="Total WGP" value={totalWGPA + ""} />
            </View>

            <SessionTabs
              activeSemesterId={activeSemesterId}
              setActiveSemesterId={setActiveSemesterId}
            />
          </SafeAreaView>
        </View>
        {semesters.length ? (
          <View className="w-11/12 mx-auto gap-4 flex-1">
            <ResultList activeSemesterId={activeSemesterId} />
          </View>
        ) : (
          <View className="flex-1 self-center justify-self-center mt-12">
            <Text className="text-[#606067] text-xl text-center font-medium">
              No semesters added yet
            </Text>
            <Text className="text-[#606067] text-sm text-center">
              Tap the + button above to add a semester
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const DetailsCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <View className="flex-1 bg-[#f3f4f6] rounded-lg items-center gap-1 p-4">
      <Text className="text-[#606067] font-system">{title}</Text>
      <Text className="font-semibold text-2xl font-system text-primary">
        {value}
      </Text>
    </View>
  );
};
