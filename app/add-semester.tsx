import { Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "@/components/text";
import TextInput from "@/components/text-input";
import { useSemesterStore } from "@/store/semester-store";

const AddSemester = () => {
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");
  const addSemesters = useSemesterStore((store) => store.addSemester);

  const handleAddSemester = useCallback(() => {
    // Validate input
    if (!session || !semester) {
      alert("Please fill in all fields");
      return;
    }

    // Add semester to store
    addSemesters({ session, semester });

    // Reset form fields
    setSession("");
    setSemester("");
  }, [session, semester]);

  return (
    <SafeAreaView className="flex-1">
      <Text className="font-semibold text-center py-12 text-2xl uppercase text-primary">
        Add New Semester
      </Text>

      <View className="gap-4 w-11/12 mx-auto">
        <View>
          <Text className="text-[#606067] mb-1">Level</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2"
            placeholder="e.g. 300L"
            value={session}
            onChangeText={setSession}
          />
        </View>

        <View>
          <Text className="text-[#606067] mb-1">Semester</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 font-system"
            placeholder="e.g. 2nd Semester"
            value={semester}
            onChangeText={setSemester}
          />
        </View>

        <Pressable
          className="bg-primary py-3 rounded-lg mt-4"
          onPress={handleAddSemester}
        >
          <Text className="text-white text-center font-semibold text-xl">
            Add Semester
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddSemester;

const styles = StyleSheet.create({});
