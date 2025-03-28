import { Trash } from '@/components/icons';
import PageHeader from '@/components/page-header';
import Text from '@/components/text';
import { useCourseStore } from '@/store/courses-store';
import { SemesterType, useSemesterStore } from '@/store/semester-store';
import React from 'react';
import { Alert, FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="Manage Semesters" description="Tap on a semester to delete it" />
      <FlatList
        data={semesters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Semester onPress={() => removeSemesterHandler(item.id)} semester={item} />
        )}
        ListEmptyComponent={<Text>No semesters available</Text>}
        contentContainerClassName="py-4 w-11/12 mx-auto"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ManageSemesters;
