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
        Add New Course
      </Text>

      <View className="gap-4 w-11/12 mx-auto">
        <View>
          <Text className="text-[#606067] mb-1">Course Title</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2"
            placeholder="e.g. Software Engineering"
            value={courseTitle}
            onChangeText={setCourseTitle}
          />
        </View>

        <View>
          <Text className="text-[#606067] mb-1">Course Code</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 font-system"
            placeholder="e.g. CSC 301"
            value={courseCode}
            onChangeText={setCourseCode}
          />
        </View>

        <View>
          <Text className="text-[#606067] mb-1">Course Unit</Text>
          {Platform.OS === "ios" ? (
            <View>
              <Pressable
                className="border border-gray-300 rounded-lg p-3 flex-row justify-between"
                onPress={() => {
                  setTempCourseUnit(courseUnit);
                  setIsPickerVisible(true);
                }}
              >
                <Text>
                  {courseUnit} Unit{courseUnit !== "1" ? "s" : ""}
                </Text>
                <AntDesign name="down" size={16} color="#606067" />
              </Pressable>

              <Modal
                visible={isPickerVisible}
                transparent={true}
                animationType="fade"
              >
                <View className="flex-1 bg-black/50">
                  <View className="mt-auto bg-white">
                    <View className="flex-row justify-end p-4 border-b border-gray-200">
                      <Pressable
                        onPress={() => {
                          setCourseUnit(tempCourseUnit);
                          setIsPickerVisible(false);
                        }}
                      >
                        <Text className="text-primary font-semibold">Done</Text>
                      </Pressable>
                    </View>
                    <Picker
                      selectedValue={tempCourseUnit}
                      onValueChange={(itemValue) => {
                        setTempCourseUnit(itemValue);
                      }}
                    >
                      <Picker.Item label="1 Unit" value="1" />
                      <Picker.Item label="2 Units" value="2" />
                      <Picker.Item label="3 Units" value="3" />
                      <Picker.Item label="4 Units" value="4" />
                      <Picker.Item label="5 Units" value="5" />
                    </Picker>
                  </View>
                </View>
              </Modal>
            </View>
          ) : (
            <View className="border border-gray-300 rounded-lg">
              <Picker
                selectedValue={courseUnit}
                onValueChange={(itemValue) => setCourseUnit(itemValue)}
              >
                <Picker.Item label="1 Unit" value="1" />
                <Picker.Item label="2 Units" value="2" />
                <Picker.Item label="3 Units" value="3" />
                <Picker.Item label="4 Units" value="4" />
                <Picker.Item label="5 Units" value="5" />
              </Picker>
            </View>
          )}
        </View>

        <View>
          <Text className="text-[#606067] mb-1">Score</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2"
            placeholder="e.g. 70"
            value={courseScore}
            onChangeText={setCourseScore}
            keyboardType="numeric"
            onFocus={() => {
              setTempCourseScore(courseScore);
              setIsScorePickerVisible(true);
            }}
          />
        </View>

        <Pressable
          className="bg-primary py-3 rounded-lg mt-4"
          onPress={handleAddCourse}
        >
          <Text className="text-white text-center font-semibold text-xl">
            Add Course
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddCourse;

const styles = StyleSheet.create({});
