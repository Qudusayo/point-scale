import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist, createJSONStorage } from "zustand/middleware";
import { LayoutAnimation } from "react-native";

export type CourseType = {
  id: string;
  course_code: string;
  course_title: string;
  course_units: number;
  result: number;
  session_id: string;
};

type CoursesState = {
  courses: CourseType[];
  addCourse: (data: Omit<CourseType, "id">) => Promise<void>;
  removeCourse: (id: string) => void;
};

export const useCourseStore = create(
  persist<CoursesState>(
    (set) => ({
      courses: [],
      addCourse: async (data: Omit<CourseType, "id">) => {
        set((state) => {
          return {
            ...state,
            courses: [
              {
                ...data,
                id: nanoid(),
              },
              ...state.courses,
            ],
          };
        });
      },
      removeCourse: (course_id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        set((state) => {
          return {
            ...state,
            courses: state.courses.filter((course) => course.id !== course_id),
          };
        });
      },
    }),
    {
      name: "point-scale-courses-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
