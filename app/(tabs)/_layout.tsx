import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { Home, Settings } from '@/components/icons';
import Text from '@/components/text';
import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

const HeaderLeft = ({ text }: { text: string }) => (
  <View className="flex-row items-center gap-4 px-4">
    <Text className="text-2xl font-bold text-[#5271FF]">{text}</Text>
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { bottomSheetRef, handleSheetChanges } = useBottomSheetContext();

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
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Home stroke={color} />,
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
            tabBarIcon: ({ color, size }) => <Settings stroke={color} />,
            headerLeft: () => <HeaderLeft text="Settings" />,
          }}
        />
      </Tabs>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={[400]}
        index={-1}
        enablePanDownToClose
        backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
      >
        <BottomSheetView className="p-9">
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
