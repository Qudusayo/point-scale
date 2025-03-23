import React, { useEffect } from "react";
import { Pressable, PressableProps, ScrollView, View } from "react-native";
import Text from "./text";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { cn } from "@/lib/utils";
import { useSemesterStore } from "@/store/semester-store";

interface SelectorProps extends PressableProps {
  title: string;
  active?: boolean;
}

interface SessionTabsProps {
  activeSemesterId: string | null;
  setActiveSemesterId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Selector = ({ title, active, ...props }: SelectorProps) => (
  <Pressable
    className={cn(
      "bg-primary/20 items-center justify-center rounded-lg px-5 py-3 ",
      active && "bg-primary"
    )}
    {...props}
  >
    <Text className="text-white font-system">{title}</Text>
  </Pressable>
);

const SessionTabs = ({
  activeSemesterId,
  setActiveSemesterId,
}: SessionTabsProps) => {
  const semesters = useSemesterStore((store) => store.semesters);

  useEffect(() => {
    console.log({ semesters });
  }, [semesters]);

  return (
    <View className="flex-row gap-2">
      {semesters.length ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="iflex-row items-center gap-3"
        >
          {semesters.map((semester) => (
            <Selector
              key={semester.id}
              onPress={() => {
                setActiveSemesterId(semester.id);
              }}
              title={`${semester.session} ${semester.semester}`}
              active={activeSemesterId === semester.id}
            />
          ))}
        </ScrollView>
      ) : null}
      <Link href="/add-semester" asChild>
        <Pressable hitSlop={8} className="rounded-lg bg-primary p-2">
          <AntDesign name="plus" size={24} color="#fff" />
        </Pressable>
      </Link>
    </View>
  );
};

export default SessionTabs;
