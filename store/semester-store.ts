import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid';
import 'react-native-get-random-values';
import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

export type SemesterType = {
  id: string;
  session: string;
  semester: string;
};

type SemesterState = {
  semesters: SemesterType[];
  addSemester: (data: Omit<SemesterType, 'id'>) => void;
  removeSemester: (id: string) => void;
};

const persistConfig: PersistOptions<SemesterState> = {
  name: 'point-scale-semesters-store',
  storage: createJSONStorage(() => AsyncStorage),
};

export const useSemesterStore = create(
  persist<SemesterState>(
    (set) => ({
      semesters: [],
      addSemester: (data: Omit<SemesterType, 'id'>) => {
        set((state) => {
          const semester = {
            ...data,
            id: nanoid(),
          };
          return {
            ...state,
            semesters: [semester, ...state.semesters],
          };
        });
      },
      removeSemester: (course_id: string) => {
        set((state) => {
          return {
            ...state,
            semesters: state.semesters.filter((course) => course.id !== course_id),
          };
        });
      },
    }),
    persistConfig,
  ),
);
