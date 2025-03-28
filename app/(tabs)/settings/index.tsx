import {
  Badges,
  Category,
  ComingSoon,
  MessageReport,
  RoudedArrowDown,
  SortAscendingShapes,
} from '@/components/icons';
import PageHeader from '@/components/page-header';
import Text from '@/components/text';
import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg from 'react-native-svg';

interface PressableContentProps extends React.ComponentProps<typeof Pressable> {
  title: string;
  description: string;
  comingSoon?: boolean;
  icon: React.FC<React.ComponentProps<typeof Svg>>;
}

interface NavLinkProps extends PressableContentProps {
  href?: string;
}

const PressableContent = forwardRef(
  ({ title, description, icon, onPress, comingSoon }: PressableContentProps, _) => {
    return (
      <Pressable className="flex-row items-center justify-between px-4" onPress={onPress}>
        <View className="flex-row items-center">
          {icon({
            fill: '#bec3c9',
            width: 32,
            height: 32,
          })}
          <View className="px-4 leading-3">
            <Text className="text-xl">{title}</Text>
            <Text className="text-sm leading-4 text-[#bec3c9]">{description}</Text>
          </View>
        </View>
        {comingSoon ? <ComingSoon /> : null}
      </Pressable>
    );
  },
);

const NavLink = ({ href = '/settings', ...props }: NavLinkProps) => {
  return (
    <Link href={href} asChild>
      <PressableContent {...props} />
    </Link>
  );
};

const Settings = () => {
  const { open } = useBottomSheetContext();

  const openWebBrowser = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      console.error('Error opening browser:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 gap-8 bg-white">
      <PageHeader title="Settings" description="Manage your app settings" showBackButton={false} />
      <NavLink
        title="Semesters"
        description="Manage your semesters"
        icon={Category}
        href="/manage-semesters"
      />
      <PressableContent
        title="Grades"
        description="Manage your grades"
        icon={Badges}
        // href="/grades"
        onPress={() => {}}
        comingSoon
      />
      <PressableContent
        onPress={() => {
          open('courseOrder');
        }}
        icon={SortAscendingShapes}
        title="Courses Order"
        description="Manage your courses order"
      />
      <PressableContent
        onPress={() => {}}
        icon={RoudedArrowDown}
        title="Download Results"
        description="Download and share your results"
        comingSoon
      />
      <PressableContent
        icon={MessageReport}
        title="Feedback"
        description="Send us your feedback"
        onPress={() => openWebBrowser('https://www.qudusayo.pro/contact-me')}
      />
    </SafeAreaView>
  );
};

export default Settings;
