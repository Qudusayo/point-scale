import { cn } from '@/lib/utils';
import React from 'react';
import { Text as ExpoText } from 'react-native';

const Text = (props: React.ComponentProps<typeof ExpoText>) => {
  return <ExpoText {...props} className={cn(props.className, 'font-system')}></ExpoText>;
};

export default Text;
