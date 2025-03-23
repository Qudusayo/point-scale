import { Modal, Pressable, Text, TextInput, View, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";


const AddSemesterModal = ({
  visible,
  onClose,
  onAdd
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: (level: string, semester: string) => void;
}) => {
  const [level, setLevel] = useState('');
  const [semester, setSemester] = useState('');

  const handleAdd = () => {
    if (level.trim() && semester.trim()) {
      onAdd(level, semester);
      // Reset form
      setLevel('');
      setSemester('');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-10/12 p-6 rounded-lg">
            <Text className="text-xl font-semibold mb-4">Add New Semester</Text>

            <View className="mb-4">
              <Text className="mb-1 text-[#606067]">Level</Text>
              <TextInput
                className="border border-[#c5c5c5] p-2 rounded-lg"
                placeholder="e.g. 300L"
                value={level}
                onChangeText={setLevel}
              />
            </View>

            <View className="mb-6">
              <Text className="mb-1 text-[#606067]">Semester</Text>
              <TextInput
                className="border border-[#c5c5c5] p-2 rounded-lg"
                placeholder="e.g. 2nd Semester"
                value={semester}
                onChangeText={setSemester}
              />
            </View>

            <View className="flex-row justify-end gap-4">
              <Pressable
                onPress={onClose}
                className="py-2 px-4"
              >
                <Text className="text-[#606067]">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleAdd}
                className="bg-primary py-2 px-4 rounded-lg"
              >
                <Text className="text-white">Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddSemesterModal