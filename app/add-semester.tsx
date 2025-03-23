import Text from '@/components/text';
import TextInput from '@/components/text-input';
import { toast } from '@/lib/toast';
import { useSemesterStore } from '@/store/semester-store';
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const AddSemester = () => {
  const [session, setSession] = useState('');
  const [semester, setSemester] = useState('');
  const addSemesters = useSemesterStore((store) => store.addSemester);

  const handleAddSemester = useCallback(() => {
    // Validate input
    if (!session || !semester) {
      alert('Please fill in all fields');
      return;
    }

    // Add semester to store
    addSemesters({ session, semester });

    toast('New Semester Added', `${session} ${semester} has been added successfully`);

    // Reset form fields
    setSession('');
    setSemester('');
  }, [session, semester]);

  return (
    <SafeAreaView className="flex-1">
      <Text className="py-12 text-center text-2xl font-semibold uppercase text-primary">
        Add New Semester
      </Text>

      <View className="mx-auto w-11/12 gap-4">
        <View>
          <Text className="mb-1 text-[#606067]">Level</Text>
          <TextInput
            className="rounded-lg border border-gray-300 p-2"
            placeholder="e.g. 300L"
            value={session}
            onChangeText={setSession}
          />
        </View>

        <View>
          <Text className="mb-1 text-[#606067]">Semester</Text>
          <TextInput
            className="rounded-lg border border-gray-300 p-2 font-system"
            placeholder="e.g. 2nd Semester"
            value={semester}
            onChangeText={setSemester}
          />
        </View>

        <Pressable className="mt-4 rounded-lg bg-primary py-3" onPress={handleAddSemester}>
          <Text className="text-center text-xl font-semibold text-white">Add Semester</Text>
        </Pressable>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default AddSemester;

const styles = StyleSheet.create({});
