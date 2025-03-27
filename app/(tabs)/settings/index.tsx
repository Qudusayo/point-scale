import {
  Badges,
  Category,
  ComingSoon,
  MessageReport,
  SortAscendingShapes,
} from '@/components/icons';
import Text from '@/components/text';
import { useBottomSheetContext } from '@/context/bottom-sheet-context';
import { Link } from 'expo-router';
import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
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

  return (
    <View className="flex-1 gap-8 bg-white pt-4">
      <NavLink
        title="Semesters"
        description="Manage your semesters"
        icon={Category}
        href="/manage-semesters"
      />
      <NavLink title="Grades" description="Manage your grades" icon={Badges} comingSoon />
      <PressableContent
        onPress={() => {
          open('courseOrder');
        }}
        icon={SortAscendingShapes}
        title="Courses Order"
        description="Manage your courses order"
      />
      <Link href="https://www.qudusayo.pro/contact-me" asChild>
        <PressableContent
          icon={MessageReport}
          title="Feedback"
          description="Send us your feedback"
        />
      </Link>
    </View>
  );
};

export default Settings;
