import CourseOrderBottomSheetDisplay from '@/components/bottom-sheets/course-order-bottom-sheet';
import { HapticTab } from '@/components/HapticTab';
import ResultBottomSheetDisplay from '@/components/bottom-sheets/result-bottom-sheet-display';
import TabBar from '@/components/tab-bar';
import Text from '@/components/text';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserStore } from '@/store/user-store';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const HeaderLeft = ({ text }: { text: string }) => (
  <View className="flex-row items-center gap-4 px-4">
    <Text className="text-2xl text-[#5271FF]">{text}</Text>
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const hasFinishedOnboarding = useUserStore((state) => state.hasFinishedOnboarding);

  if (!hasFinishedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // headerShown: false,
          tabBarButton: HapticTab,
          headerTitle: '',
          headerStyle: {
            shadowColor: 'transparent',
            // borderBottomColor: "#f0f0f0",
            // borderBottomWidth: 1,
          },
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerLeft: () => <HeaderLeft text="Settings" />,
          }}
        />
      </Tabs>
      <ResultBottomSheetDisplay />
      <CourseOrderBottomSheetDisplay />
    </>
  );
}
