import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CoursesOrder = 'result' | 'course_units' | 'course_code' | 'default';

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
  courseOrder: CoursesOrder;
  setCourseOrder: (order: CoursesOrder) => void;
  getCourses: () => CourseType[];
  addCourse: (data: Omit<CourseType, 'id'>) => Promise<void>;
  getResultById: (id?: string) => CourseType | undefined;
  removeCourse: (id: string) => void;
  updateCourse: (id: string, data: Partial<CourseType>) => void;
  removeCoursesBySessionId: (session_id: string) => void;
};

export const useCourseStore = create(
  persist<CoursesState>(
    (set, get) => ({
      courses: [],
      courseOrder: 'default',
      setCourseOrder: (order: CoursesOrder) => {
        set((state) => ({
          ...state,
          courseOrder: order,
        }));
      },
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
      updateCourse: (course_id: string, data: Partial<CourseType>) => {
        set((state) => {
          const courseIndex = state.courses.findIndex((course) => course.id === course_id);
          if (courseIndex === -1) return state;
          const updatedCourse = {
            ...state.courses[courseIndex],
            ...data,
          };
          const updatedCourses = [...state.courses];
          updatedCourses[courseIndex] = updatedCourse;
          return {
            ...state,
            courses: updatedCourses,
          };
        });
      },
      getCourses: () => {
        const { courses, courseOrder } = get();
        switch (courseOrder) {
          case 'result':
            return [...courses].sort((a, b) => b.result - a.result);
          case 'course_units':
            return [...courses].sort((a, b) => b.course_units - a.course_units);
          case 'course_code':
            return [...courses].sort((a, b) => a.course_code.localeCompare(b.course_code));
          case 'default':
            return courses;
          default:
            return courses;
        }
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
