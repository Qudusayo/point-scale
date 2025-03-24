import { HapticTab } from '@/components/HapticTab';
import ResultBottomSheetDisplay from '@/components/result-bottom-sheet-display';
import TabBar from '@/components/tab-bar';
import Text from '@/components/text';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const HeaderLeft = ({ text }: { text: string }) => (
  <View className="flex-row items-center gap-4 px-4">
    <Text className="text-2xl font-bold text-[#5271FF]">{text}</Text>
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
            // tabBarIcon: ({ color, size }) => <Home stroke={color} />,
            headerShown: false,
          }}
        />
        {/* <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="history" size={size} color={color} />
          ),
          headerLeft: () => <HeaderLeft text="History" />,
        }}
      /> */}
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            // tabBarIcon: ({ color, size }) => <Settings stroke={color} />,
            headerLeft: () => <HeaderLeft text="Settings" />,
          }}
        />
      </Tabs>
      <ResultBottomSheetDisplay />
    </>
  );
}
