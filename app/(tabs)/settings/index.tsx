import { Badges, Category } from '@/components/icons';
import Text from '@/components/text';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import Svg from 'react-native-svg';

interface NavLinkProps {
  title: string;
  description: string;
  icon: React.FC<React.ComponentProps<typeof Svg>>;
  href?: string;
}
const NavLink = ({ title, description, icon, href = '/settings' }: NavLinkProps) => {
  return (
    <Link href={href} asChild>
      <Pressable className="flex-row items-center px-4">
        {icon({
          fill: '#bec3c9',
          width: 32,
          height: 32,
        })}
        <View className="px-4 leading-3">
          <Text className="text-xl">{title}</Text>
          <Text className="text-sm leading-4 text-[#bec3c9]">{description}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const Settings = () => {
  return (
    <View className="flex-1 gap-8 bg-white pt-4">
      <NavLink
        title="Semesters"
        description="Manage your semesters"
        icon={Category}
        href="/manage-semesters"
      />
      <NavLink title="Grades" description="Manage your grades" icon={Badges} />
    </View>
  );
};

export default Settings;
