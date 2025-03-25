import { calculateCGPA } from '@/constants/utils';
import { useCourseStore } from '@/store/courses-store';
import { useSemesterStore } from '@/store/semester-store';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import ResultCard from './result-card';
import Text from './text';

const ResultList = ({ activeSemesterId }: { activeSemesterId: string | null }) => {
  const [cgpa, setCgpa] = useState(0);
  const courses = useCourseStore((store) => store.courses);
  const results = courses.filter((course) => course.session_id === activeSemesterId);
  const semester = useSemesterStore((store) => store.semesters);
  const semesterDetails = semester.find((semester) => semester.id === activeSemesterId);

  const semesterName = semesterDetails
    ? `${semesterDetails.session} ${semesterDetails.semester}`
    : '';

  useEffect(() => {
    const result = calculateCGPA(results);
    setCgpa(result[3] || 0);
  }, [results]);

  return (
    <FlatList
      data={results}
      ListHeaderComponentClassName="pt-4"
      ListHeaderComponent={
        <View className="flex-row justify-between">
          <View>
            <View className="flex-row items-center gap-2">
              <Text className="text-lg">{semesterName}</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[#606067]">Current CGPA: {cgpa}</Text>
            </View>
          </View>
          <Link href={'/manage-course/' + activeSemesterId} asChild>
            <Pressable
              hitSlop={8}
              className="flex-row items-center gap-2 rounded-lg bg-primary px-4 py-2"
            >
              <AntDesign name="plus" size={16} color="#fff" />
              <Text className="font-system text-white">Add Course</Text>
            </Pressable>
          </Link>
        </View>
      }
      renderItem={({ item }) => <ResultCard item={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      className="flex-1"
      contentContainerClassName="gap-4 pb-28"
      ListEmptyComponent={
        <View className="mt-12 flex-1 self-center justify-self-center">
          <Text className="text-center text-xl font-medium text-[#606067]">
            No courses added yet
          </Text>
          <Text className="text-center text-sm text-[#606067]">
            Tap the button above to add a course
          </Text>
        </View>
      }
    />
  );
};

export default ResultList;
