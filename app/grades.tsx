import GradeCard from '@/components/grade-card';
import PageHeader from '@/components/page-header';
import Text from '@/components/text';
import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const { open } = useBottomSheetContext();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="Manage Grades" description="Manage your grades and their settings" />
      <View className="mx-auto w-11/12 gap-8 py-4">
        <View className="gap-4">
          <GradeCard />
          <GradeCard />
        </View>
        <TouchableOpacity
          className="flex-row items-center justify-center gap-4 rounded-lg bg-primary p-4"
          onPress={() => open('gradeSettings')}
          activeOpacity={0.8}
        >
          <Feather name="plus" size={24} color="white" />
          <Text className="text-lg text-white">Add new grade</Text>
        </TouchableOpacity>

        <View className="flex-row items-start justify-center gap-4 rounded-lg bg-[#f3f4f6] px-6 py-4">
          <Feather name="info" size={20} color="black" className="top-1" />
          <Text className="flex-1 text-lg">
            Changes to grade settings will affect all future calculations. Historical grades will
            not be affected.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
