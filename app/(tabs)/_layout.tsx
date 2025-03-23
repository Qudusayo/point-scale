import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform, Text, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const HeaderLeft = ({ text }: { text: string }) => (
  <View className="flex-row items-center gap-4 px-4">
    <Text
      style={{
        fontSize: 22,
        fontWeight: "600",
        color: Colors["light"].tint,
      }}
    >
      {text}
    </Text>
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // headerShown: false,
        tabBarButton: HapticTab,
        headerTitle: "",
        headerStyle: {
          shadowColor: "transparent",
          // borderBottomColor: "#f0f0f0",
          // borderBottomWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
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
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
          headerLeft: () => <HeaderLeft text="Grade Settings" />,
        }}
      />
    </Tabs>
  );
}
