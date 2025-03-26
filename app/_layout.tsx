import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { colorScheme } from 'nativewind';
import 'react-native-reanimated';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import '../global.css';

configureReanimatedLogger({
  level: ReanimatedLogLevel.error,
  strict: true,
});

import { BottomSheetProvider } from '@/context/bottom-sheet-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
colorScheme.set('light');

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded] = useFonts({
    WinkySans: require('../assets/fonts/WinkySans.ttf'),
    AtkinsonHyperlegible: require('../assets/fonts/AtkinsonHyperlegible.ttf'),
  });

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
            name="manage-course/[semester-id]"
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
            name="import"
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
