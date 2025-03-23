import ResultList from '@/components/result-list';
import SessionTabs from '@/components/session-tabs';
import Text from '@/components/text';
import { calculateCGPA } from '@/constants/utils';
import { useCourseStore } from '@/store/courses-store';
import { useSemesterStore } from '@/store/semester-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      console.log('AsyncStorage cleared!');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
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
          <SafeAreaView className="mx-auto w-11/12 gap-8 py-8" edges={['top', 'left', 'right']}>
            <View className="items-center gap-2">
              <Text>Current CGPA</Text>
              <Text className="font-system text-7xl font-semibold text-primary">
                {totalCGPA.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row gap-4">
              <DetailsCard title="Units Reg." value={totalUnits + ''} />
              <DetailsCard title="Units Passed" value={unitsPassed + ''} />
              <DetailsCard title="Total WGP" value={totalWGPA + ''} />
            </View>

            <SessionTabs
              activeSemesterId={activeSemesterId}
              setActiveSemesterId={setActiveSemesterId}
            />
          </SafeAreaView>
        </View>
        {semesters.length ? (
          <View className="mx-auto w-11/12 flex-1 gap-4">
            <ResultList activeSemesterId={activeSemesterId} />
          </View>
        ) : (
          <View className="mt-12 flex-1 self-center justify-self-center">
            <Text className="text-center text-xl font-medium text-[#606067]">
              No semesters added yet
            </Text>
            <Text className="text-center text-sm text-[#606067]">
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
    <View className="flex-1 items-center gap-1 rounded-lg bg-[#f3f4f6] p-4">
      <Text className="font-system text-[#606067]">{title}</Text>
      <Text className="font-system text-2xl font-semibold text-primary">{value}</Text>
    </View>
  );
};
