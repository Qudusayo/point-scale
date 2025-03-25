import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { colorScheme } from 'nativewind';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import { BottomSheetProvider } from '@/context/bottom-sheet-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
colorScheme.set('light');

export default function RootLayout() {
  const [loaded] = useFonts({
    WinkySans: require('../assets/fonts/WinkySans.ttf'),
    AtkinsonHyperlegible: require('../assets/fonts/AtkinsonHyperlegible.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <BottomSheetProvider>
      <GestureHandlerRootView className="flex-2">
        {/* <ThemeProvider> */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="add-course/[semester-id]"
            options={{
              presentation: 'modal',
              headerShown: false,
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="manage-semesters"
            options={{
              presentation: 'modal',
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="add-semester"
            options={{
              presentation: 'modal',
              headerShown: false,
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
        <StatusBar style="auto" />
        {/* </ThemeProvider> */}
      </GestureHandlerRootView>
    </BottomSheetProvider>
  );
}
