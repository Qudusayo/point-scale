import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
  addCourse: (data: Omit<CourseType, 'id'>) => Promise<void>;
  getResultById: (id?: string) => CourseType | undefined;
  removeCourse: (id: string) => void;
  removeCoursesBySessionId: (session_id: string) => void;
};

export const useCourseStore = create(
  persist<CoursesState>(
    (set, get) => ({
      courses: [],
      addCourse: async (data: Omit<CourseType, 'id'>) => {
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
        set((state) => {
          return {
            ...state,
            courses: state.courses.filter((course) => course.id !== course_id),
          };
        });
      },
      removeCoursesBySessionId: (session_id: string) => {
        set((state) => {
          return {
            ...state,
            courses: state.courses.filter((course) => course.session_id !== session_id),
          };
        });
      },
      getResultById: (id?: string) => {
        const { courses } = get();
        const course = courses.find((course) => course.id === id);
        return course;
      },
    }),
    {
      name: 'point-scale-courses-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
