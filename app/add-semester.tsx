import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Text from "@/components/text";
import TextInput from "@/components/text-input";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseUnit, setCourseUnit] = useState("3");
  const [courseScore, setCourseScore] = useState("");
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [tempCourseUnit, setTempCourseUnit] = useState("3");
  const [isScorePickerVisible, setIsScorePickerVisible] = useState(false);
  const [tempCourseScore, setTempCourseScore] = useState("");

  const handleAddCourse = useCallback(() => {
    console.log("Adding course:", {
      courseTitle,
      courseCode,
      courseUnit,
      courseScore,
    });
    // Reset form fields
    setCourseTitle("");
    setCourseCode("");
    setCourseUnit("3");
    setCourseScore("");
  }, [courseTitle, courseCode, courseUnit, courseScore]);

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
            value={courseTitle}
            onChangeText={setCourseTitle}
          />
        </View>

        <View>
          <Text className="text-[#606067] mb-1">Semester</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 font-system"
            placeholder="e.g. 2nd Semester"
            value={courseCode}
            onChangeText={setCourseCode}
          />
        </View>

        <Pressable
          className="bg-primary py-3 rounded-lg mt-4"
          onPress={handleAddCourse}
        >
          <Text className="text-white text-center font-semibold text-xl">
            Add Semester
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddCourse;

const styles = StyleSheet.create({});
