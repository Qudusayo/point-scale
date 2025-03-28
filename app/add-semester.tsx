import Text from '@/components/text';
import TextInput from '@/components/text-input';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { useSemesterStore } from '@/store/semester-store';
import { useFormik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const AddSemester = () => {
  const addSemesters = useSemesterStore((store) => store.addSemester);

  const formData = useFormik({
    initialValues: {
      session: '',
      semester: '',
    },
    validationSchema: Yup.object().shape({
      session: Yup.string().required('Session is required'),
      semester: Yup.string().required('Semester is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const { session, semester } = values;

      addSemesters({ session, semester });
      toast('New Semester Added', `${session} ${semester} has been added successfully`);
      resetForm();
    },
  });

  return (
    <SafeAreaView className="flex-1">
      <Text className="py-12 text-center text-2xl uppercase text-primary">Add New Semester</Text>

      <View className="mx-auto w-11/12 gap-4">
        <View>
          <Text className="mb-1 text-[#606067]">Level</Text>
          <TextInput
            className={cn(
              formData.touched.session && formData.errors.session
                ? 'border-red-500'
                : 'border-gray-300',
            )}
            placeholder="e.g. 300L"
            value={formData.values.session}
            onBlur={formData.handleBlur('session')}
            onChangeText={formData.handleChange('session')}
          />
        </View>

        <View>
          <Text className="mb-1 text-[#606067]">Semester</Text>
          <TextInput
            className={cn(
              formData.touched.semester && formData.errors.semester
                ? 'border-red-500'
                : 'border-gray-300',
            )}
            placeholder="e.g. 2nd Semester"
            value={formData.values.semester}
            onBlur={formData.handleBlur('semester')}
            onChangeText={formData.handleChange('semester')}
          />
        </View>

        <Pressable
          className="mt-4 rounded-xl bg-primary py-3 disabled:opacity-50"
          onPress={() => formData.handleSubmit()}
          disabled={
            !formData.isValid || formData.isSubmitting || formData.isValidating || !formData.dirty
          }
        >
          <Text className="text-center text-xl text-white">Add Semester</Text>
        </Pressable>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default AddSemester;

const styles = StyleSheet.create({});
