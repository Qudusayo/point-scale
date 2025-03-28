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
    <View className="flex-row items-center justify-between py-4 text-lg font-bold text-gray-800">
      <View className="leading-3">
        <Text className="text-xl">
          {semester.session} {semester.semester}
        </Text>
      </View>
      <View className="flex-row gap-4">
        {/* <Pressable onPress={() => {}} hitSlop={10} className="rounded-xl bg-[#5271FF] p-2">
          <Pencil stroke="#fff" />
        </Pressable> */}
        <Pressable onPress={onPress} hitSlop={10} className="rounded-xl bg-[#d50000a8] p-2">
          <Trash stroke="#fff" />
        </Pressable>
      </View>
    </View>
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
      <PageHeader title="Manage Semesters" description="Take control of your semesters." />
      <FlatList
        data={semesters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Semester onPress={() => removeSemesterHandler(item.id)} semester={item} />
        )}
        ListEmptyComponent={
          <View className="mt-8 items-center justify-center">
            <Text className="text-lg text-gray-500">No semesters found</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
        contentContainerClassName="py-4 w-11/12 mx-auto flex-1"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ManageSemesters;
