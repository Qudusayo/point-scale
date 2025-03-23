import { Text as ExpoText } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";

const Text = (props: React.ComponentProps<typeof ExpoText>) => {
  return (
    <ExpoText
      {...props}
      className={cn(props.className, "font-system")}
    ></ExpoText>
  );
};

export default Text;
