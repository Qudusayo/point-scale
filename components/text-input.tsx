import { TextInput as ExpoTextInput, Platform } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";

const TextInput = (props: React.ComponentProps<typeof ExpoTextInput>) => {
  return (
    <ExpoTextInput
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
        },
      ]}
      className={cn(props.className, "font-system")}
    ></ExpoTextInput>
  );
};

export default TextInput;
