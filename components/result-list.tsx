import { View, Text, FlatList, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import ResultCard from "./result-card";
import { calculateCGPA, CourseDetails } from "@/constants/utils";

const ResultList = ({
  name,
  results = [],
}: {
  name: string | (() => string);
  results: CourseDetails[];
}) => {
  const [cgpa, setCgpa] = useState(0);

  useEffect(() => {
    const result = calculateCGPA(results);
    setCgpa(result[3] || 0);
  }, [results]);

  return (
    <FlatList
      data={results.filter((item) => item.result !== "NA")}
      ListHeaderComponentClassName="pt-4"
      ListHeaderComponent={
        <View className="flex-row justify-between">
          <View>
            <View className="flex-row items-center gap-2">
              <Text className="text-lg">
                {typeof name === "function" ? name() : name}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[#606067]">Current CGPA: {cgpa}</Text>
            </View>
          </View>
          <Link href="/add-course" asChild>
            <Pressable
              hitSlop={8}
              className="rounded-lg bg-primary py-2 px-4 flex-row items-center gap-2"
            >
              <AntDesign name="plus" size={16} color="#fff" />
              <Text className="text-white font-system">Add Course</Text>
            </Pressable>
          </Link>
        </View>
      }
      renderItem={({ item }) => (
        <ResultCard
          name={item.course_title}
          code={item.course_code}
          unit={+item.course_units}
          score={+item.result}
          onSwipeFromLeft={() => Alert.alert("Swipe from left")}
          onRightPress={() => console.log("Swipe from right")}
        />
      )}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      className="flex-1"
      contentContainerClassName="gap-4 pb-8"
      ListEmptyComponent={
        <View className="flex-1 self-center justify-self-center mt-12">
          <Text className="text-[#606067] text-xl text-center font-medium">
            No courses added yet
          </Text>
          <Text className="text-[#606067] text-sm text-center">
            Tap the button above to add a course
          </Text>
        </View>
      }
    />
  );
};

export default ResultList;
