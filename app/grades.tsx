import PageHeader from '@/components/page-header';
import TableFlatList from '@/components/table-flat-list';
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
      <View className="mx-auto w-11/12 flex-1 gap-8 py-4">
        <View className="relative flex-row items-center justify-between">
          <View>
            <Text className="text-3xl leading-8">Scale</Text>
            <Text className="text-sm leading-4">Used to calculate your grades.</Text>
          </View>

          <Text className="absolute right-0 pt-2 text-5xl text-primary ">4.0</Text>
        </View>
        <View className="flex-1 rounded-lg bg-[#f3f4f6] px-3">
          <TableFlatList />
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center gap-4 rounded-xl bg-primary p-3"
          onPress={() => open('gradeSettings')}
          activeOpacity={0.8}
        >
          <Feather name="plus" size={24} color="white" />
          <Text className="text-lg text-white">Add new grade</Text>
        </TouchableOpacity>

        <View className="flex-row items-start justify-center gap-4 rounded-xl bg-[#f3f4f6] px-6 py-4">
          <Feather name="info" size={20} color="#6b7280" className="top-1" />
          <Text className="flex-1 text-base text-gray-500">
            Changes to grade settings will affect all future calculations. You can swipe the table data left to remove them.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
