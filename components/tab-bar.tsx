import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Home, Settings } from './icons';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const primaryColor = '#318857';
  const greyColor = '#6c6d73';

  const icons = {
    index: () => Home,
    settings: () => Settings,
  };

  return (
    <View className="android:pt-10 absolute bottom-0 w-full border border-transparent pt-12">
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          if (['_sitemap', '+not-found'].includes(route.name)) return null;

          return (
            <TouchableOpacity
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={route.key}
              style={styles.tabBarItem}
              onPressIn={(ev) => {
                if (process.env.EXPO_OS === 'ios') {
                  // Add a soft haptic feedback when pressing down on the tabs.
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
              }}
            >
              {icons[route.name as keyof typeof icons]()({
                width: 20,
                height: 20,
                color: isFocused ? '#5271FF' : greyColor,
              })}

              <Text
                style={{
                  fontSize: 10,
                  color: isFocused ? '#5271FF' : greyColor,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    bottom: Platform.select({
      ios: 26,
      android: 18,
    }),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 50,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 0.1,
    width: '50%',
    alignSelf: 'center',
    elevation: 10,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    height: '100%',
    paddingVertical: 10,
  },
});

export default TabBar;
