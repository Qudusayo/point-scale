import { Trash } from '@/components/icons';
import Text from '@/components/text';
import { useCourseStore } from '@/store/courses-store';
import { SemesterType, useSemesterStore } from '@/store/semester-store';
import React from 'react';
import { Alert, FlatList, Pressable, SafeAreaView, View } from 'react-native';

interface SemesterProps extends React.ComponentProps<typeof Pressable> {
  semester: SemesterType;
}

const Semester = ({ semester, onPress }: SemesterProps) => {
  return (
    <Pressable
      className="flex-row justify-between border-b border-gray-200 py-4 text-lg font-bold text-gray-800"
      onPress={onPress}
    >
      <View className="leading-3">
        <Text className="text-xl">
          {semester.session} {semester.semester}
        </Text>
      </View>
      <Trash stroke="#d50000a8" />
    </Pressable>
  );
};

const ManageSemesters = () => {
  const { semesters, removeSemester } = useSemesterStore((state) => state);
  const removeCoursesBySessionId = useCourseStore((state) => state.removeCoursesBySessionId);

  const removeSemesterHandler = (id: string) => {
    const semester = semesters.find((semester) => semester.id === id);
    Alert.alert(
      `Are you sure you want to delete ${semester?.session} ${semester?.semester}?`,
      'This will remove all courses under this semester',
      [
        {
          text: 'Yes',
          onPress: () => {
            removeCoursesBySessionId(id);
            removeSemester(id);
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="android:pt-20 py-12">
        <Text className="text-center text-2xl font-normal uppercase text-primary">
          Manage Semesters
        </Text>
        <Text className="mx-auto w-11/12 text-center text-sm font-normal text-gray-700">
          Tap on a semester to delete it
        </Text>
      </View>
      <FlatList
        data={semesters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Semester onPress={() => removeSemesterHandler(item.id)} semester={item} />
        )}
        ListEmptyComponent={<Text>No semesters available</Text>}
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ManageSemesters;
