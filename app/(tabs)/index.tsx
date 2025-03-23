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
import AddSemesterModal from "@/components/add-semester-modal";
import Text from "@/components/text";
import { Link } from "expo-router";
import { _100L, _200L, _300L } from "@/constants/result";
import ResultList from "@/components/result-list";
import { calculateCGPA, CourseDetails } from "@/constants/utils";

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalCGPA, setTotalCGPA] = useState(0);
  const [activeSemesterId, setActiveSemesterId] = useState<string | null>(null);
  const [semesters, setSemesters] = useState<
    {
      id: string;
      level: string;
      semester: string;
      results: CourseDetails[];
    }[]
  >([]);
  const [totalWGPA, setTotalWGPA] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [unitsPassed, setUnitsPassed] = useState(0);

  useEffect(() => {
    const calculateTotalCGPA = () => {
      const results = [..._100L, ..._200L, ..._300L].filter(
        (item) => item.result !== "NA"
      );
      const cgpa = calculateCGPA(results);
      setTotalUnits(cgpa[0] || 0);
      setUnitsPassed(cgpa[1] || 0);
      setTotalWGPA(cgpa[2] || 0);
      setTotalCGPA(cgpa[3] || 0);
    };

    const semesterData = [
      {
        id: "1",
        level: "300L",
        semester: "Session",
        results: _300L,
      },
      {
        id: "2",
        level: "200L",
        semester: "Session",
        results: _200L,
      },
      {
        id: "3",
        level: "100L",
        semester: "Session",
        results: _100L,
      },
    ];
    setSemesters(semesterData);
    setActiveSemesterId(semesterData[0].id);

    calculateTotalCGPA();
  }, []);

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

            <View className="flex-row gap-2">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="iflex-row items-center gap-3"
              >
                {semesters.map((semester) => (
                  <Selector
                    key={semester.id}
                    onPress={() => {
                      setActiveSemesterId(semester.id);
                    }}
                    title={`${semester.level} ${semester.semester}`}
                    active={activeSemesterId === semester.id}
                  />
                ))}
              </ScrollView>
              <Link href="/add-semester" asChild>
                <Pressable hitSlop={8} className="rounded-lg bg-primary p-2">
                  <AntDesign name="plus" size={24} color="#fff" />
                </Pressable>
              </Link>
            </View>
          </SafeAreaView>
        </View>
        <View className="w-11/12 mx-auto gap-4 flex-1">
          <ResultList
            name={() => {
              const semester = semesters.find(
                (item) => item.id === activeSemesterId
              );
              return semester ? `${semester.level} ${semester.semester}` : "";
            }}
            results={[
              ...(semesters.find((item) => item.id === activeSemesterId)
                ?.results || []),
            ].filter((item) => item.result !== "NA")}
          />
        </View>
      </View>
      <AddSemesterModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={(level, semester) => {
          console.log("Adding:", level, semester);
          setIsModalVisible(false);
        }}
      />
    </View>
  );
}

interface SelectorProps extends PressableProps {
  title: string;
  active?: boolean;
}

const Selector = ({ title, active, ...props }: SelectorProps) => (
  <Pressable
    className={cn(
      "bg-primary/20 items-center justify-center rounded-lg px-5 py-3 ",
      active && "bg-primary"
    )}
    {...props}
  >
    <Text className="text-white font-system">{title}</Text>
  </Pressable>
);

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
