import { cn } from '@/lib/utils';
import { BottomSheetTextInput as TextInput } from '@gorhom/bottom-sheet';
import React from 'react';
import { Platform } from 'react-native';

const BottomSheetTextInput = (props: React.ComponentProps<typeof TextInput>) => {
  return (
    <TextInput
      {...props}
      style={[
        props.style,
        {
          height: Platform.select({
            ios: 45,
            android: 50,
            default: 50,
          }),
          fontSize: 16,
          paddingVertical: 8,
          paddingHorizontal: 12,
          lineHeight: 20,
          // backgroundColor: 'rgba(220, 220, 220, 0.775)',
        },
      ]}
      className={cn(props.className, 'rounded-xl border border-gray-300 font-system')}
    ></TextInput>
  );
};

export default BottomSheetTextInput;
